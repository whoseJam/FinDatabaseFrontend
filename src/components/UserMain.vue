<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <h1 class="ui header">
        用户主页
      </h1>

      <div class="ui segment" style="float:left; width: 40%; height:400px">
        <h3 class="ui header">用户信息</h3><br>
        <div style="text-align: center;">
          <img :src="photoUrl" alt="" style="height:150px; width:150px">
          <br>
          <p style="font-size: 24px;"><b>{{ username }}</b></p>
          <p style="color: gray">用户ID：{{ userId }}</p>
        </div>
        <button class="ui button" type="button" @click="showUpload" style="position: absolute; left: 40%; top:85%">设置头像</button>
        <button class="ui button" type="button" @click="logoff" style="position: absolute; left: 70%; top:85%">退出登录</button>
      </div>
      <div class="ui segment" style="float:left; width: 60%; height:200px">
        <h3 class="ui header">
          我的自选
          <button class="ui button" type="button" style="position:relative; left:10%" @click="setData(this.focusList)">换一个</button>
          <button class="ui button" type="button" style="position:relative; left:15%" @click="jump2Stock">总览</button>
        </h3>
        <table class="ui unstackable table">
        <thead>
          <tr>
            <th>名称</th>
            <th>最新价</th>
            <th>涨跌幅</th>
            <th>涨跌额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="vertical masthead segment">
                <div>{{ name }}</div>
                <div>{{ code }}</div>
              </div>
            </td>
            <td :style="computeStyle(deltaRate)">
              {{ newPrice }}
            </td>
            <td :style="computeStyle(deltaRate)">
              {{ deltaRate }}%
            </td>
            <td :style="computeStyle(deltaRate)">
              {{ delta }}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="ui segment" style="float:left; width: 60%; height:175px">
        <h3 class="ui header">
          我的模拟
          <button class="ui button" type="button" style="position:relative; left:10%" @click="jump2Simulate">详情</button>
        </h3>
        <div>
          <p>当前总资产：<b>{{ allBalance }}</b></p>
          <p>当前可用资金：<b>{{ usefulBalance }}</b></p>
          <p>当前总盈亏：
            <span :style="computeStyle(allDelta)"><b>{{ allDelta }}</b></span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <el-dialog title="头像预览" id="cropDialog" v-model="isCropVisible" width="70%" height="250px">
    <div class="ctr">
      <img id="cropImg">
    </div>
    <div class="bottom">
      <div class="previewBox"></div>
      <div class="upload"><button class="ui button" @click="upload">上传</button></div>
    </div>
  </el-dialog>
  <el-dialog id="uploadDialog" v-model="isUploadVisible" width="70%" height="50%">
    <el-upload class="upload-demo" action="" drag :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
    </el-upload>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
      let user = window.sessionStorage.getItem("user");
      let id = window.sessionStorage.getItem("userId");
      if (!id) {
        alert("请先登录！");
        this.$router.push({path: '/login'});
        return;
      }
      return {
          username: user,
          userId: id,
          name: "",
          code: "",
          newPrice: "",
          deltaRate: "",
          delta: "",
          allBalance: null,
          usefulBalance: null,
          allDelta: null,
          isUploadVisible: false,
          isCropVisible: false,
          photoUrl: "",
      }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    let self = this;
    this.$http
      .post("/user/getPhoto/" + userId)
      .then(function(res) {
        res = res.data
        self.photoUrl = res.image_url
        console.log(self.photoUrl)
      })
      .catch(function(err) {
        alert("发生错误：" + err);
        self.photoUrl = "src/test.png"
      });
    this.$http
      .post("/user/favor/" + userId)
      .then(function(res) {
        res = res.data;
        self.focusList = res;
        self.setData(self.focusList);
      })
      .catch(function(err) {
        alert(err);
        self.focusList = [
          { name: "富春股份", code: "SZ300299", newPrice: 6.62, deltaRate: -7.76, delta: -0.55 },
          { name: "永泰能源", code: "SH600157", newPrice: 1.36, deltaRate: 0.00, delta: 0.00 },
          { name: "白云机场", code: "SH600004", newPrice: 10.63, deltaRate: 0.85, delta: 0.09 },
          { name: "浦发银行", code: "SH600000", newPrice: 6.89, deltaRate: -0.72, delta: -0.05 }
        ];
        self.setData(self.focusList);
      });
    this.$http
      .post("/user/balance/" + userId)
      .then(function(res) {
        res = res.data;
        self.allBalance = res.balance;
      })
      .catch(function(err) {
        alert(err);
        self.allBalance = 484300;
      });
    this.$http
      .post("/stock/simulate/hold/" + userId)
      .then(function(res) {
        res = res.data;
        self.holdList = res;
        self.setUseful(self.holdList);
      })
      .catch(function(err) {
        alert(err);
        self.holdList = [
          { name: "富春股份", code: "SZ300299", newValue: 33100.00, delta: -15700.00, deltaRate: -32.17, hold: 5000, newPrice: 6.62, holdPrice: 9.76 }
        ]
        self.setUseful(self.holdList);
      })
  },
  methods: {
    logoff: function() {
      window.sessionStorage.removeItem("userId");
      window.sessionStorage.removeItem("user");
      alert("已成功退出登录！")
      this.$router.push({path: '/'});
    },
    jump2Stock: function() {
      this.$router.push({path: '/myStock'});
    },
    jump2Simulate: function() {
      this.$router.push({path: '/simulate'});
    },
    computeStyle: function(delta) {
      let eps = 1e-4;
      if (Math.abs(delta) <= eps) return "color: black";
      else if (delta > 0) return "color: red";
      return "color: green";
    },
    setData: function(list) {
      var rand;
      if (list.length == 0) {
        this.code = "";
        this.name = "暂无自选";
        this.newPrice = 0;
        this.deltaRate = 0;
        this.delta = 0;
        return;
      }
      do {
        rand = Math.trunc(Math.random() * list.length)
      } while (list[rand].code == this.code);
      this.code = list[rand].code;
      this.name = list[rand].name;
      this.newPrice = list[rand].newPrice;
      this.deltaRate = list[rand].deltaRate;
      this.delta = list[rand].delta;
    },
    setUseful: function(list) {
      this.usefulBalance = this.allBalance;
      this.allDelta = 0;
      for (var i = 0; i < list.length; i++) {
        this.usefulBalance -= list[i].newValue;
        this.allDelta += list[i].delta;
      }
    },
    showUpload: function() {
      this.isUploadVisible = true;
    },
    changeUpload: function(file, fileList) {
      let reader = new FileReader();
      this.isCropVisible = true;
      console.log(file.raw)
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        let dataURL = reader.result;
        document.querySelector('#cropImg').src = dataURL;
        if (this.cropperInstance) {
          this.cropperInstance.destroy();
        }
        const image = document.getElementById('cropImg');
        this.cropperInstance = new Cropper(image, {
          aspectRatio: 16 / 16,
          viewMode: 0,
          minContainerWidth: 20,
          minContainerHeight: 20,
          dragMode: 'move',
          preview: [document.querySelector('.previewBox')]
          })
        }
      // this.option.img = require(file.url)
      this.isCropVisible = true
      },
    upload: function() {
      this.cropperInstance.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      }).toBlob((blob) => {
        console.log(blob);
        const data = new FormData();
        let self = this;
        data.append("photo", blob, '1.jpg');
        data.append("userId", self.userId);
        this.$http({
          method: 'post',
          url: '/user/upload/photo',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (res) {
          res = res.data;
          if (res.success) {
            alert("头像更改成功！")
            self.isCropVisible = false;
            self.isUploadVisible = false;
            const newdata = new FormData()
            newdata.append("userId", self.userId)
            self.$http({
              method: 'post',
              url: 'user/getPhoto',
              data: newdata,
              headers: { 'Content-Type': 'multipart/form-data' }
            }).then(function (res) {
              res = res.data
              self.photoUrl = res.image_url
              console.log(self.photoUrl)
            }).catch(function(err) {
              alert("发生错误：" + err);
            })
          }
        }).catch(function(err) {
          alert("发生错误：" + err);
        })
      })
    }
  }
}
</script>

<style scoped>
  .previewBox {
      box-shadow: 0 0 5px #adadad;
      width: 150px;
      height: 150px;
      overflow: hidden;
      position: relative;
      left: 15%;
  }

  .ctr {
      height: 200px;
      width: 50%;
      float: left;
      position: relative;
      left: 10%;
  }

  .upload {
      position: relative;
      top: 10px;
      left: 15%;
  }
</style>