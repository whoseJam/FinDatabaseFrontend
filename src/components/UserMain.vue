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
        <button class="ui primary button" type="button" @click="showUpload" style="position: absolute; left: 40%; top:85%">设置头像</button>
        <button class="ui negative button" type="button" @click="logoff" style="position: absolute; left: 70%; top:85%">退出登录</button>
      </div>
      <div class="ui segment" style="float:left; width: 60%; height:200px" v-if="!isAdmin">
        <h3 class="ui header">
          我的自选
          <button class="ui button" type="button" style="position:relative; left:10%" @click="setData(this.focusList)">换一个</button>
          <button class="ui button" type="button" style="position:relative; left:15%" @click="jump2MyStock">总览</button>
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
                <div @click="jump2Stock(code)">{{ name }}</div>
                <div @click="jump2Stock(code)">{{ code }}</div>
              </div>
            </td>
            <td :style="computeStyle(deltaRate)" @click="jump2Stock(code)">
              {{ newPrice }}
            </td>
            <td :style="computeStyle(deltaRate)" @click="jump2Stock(code)">
              {{ deltaRate }}%
            </td>
            <td :style="computeStyle(deltaRate)" @click="jump2Stock(code)">
              {{ delta }}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="ui segment" style="float:left; width: 60%; height:175px" v-if="!isAdmin">
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
      <div class="ui segment" style="float:left; width: 60%; height:400px" v-if="isAdmin">
        <h3 class="ui header">
          管理员操作
        </h3>
        <div style="text-align: center;">
          <p><button class="ui button" type="button" style="width: 40%;" @click="jump2Admin(0)">用户信息管理</button></p>
          <p><button class="ui button" type="button" style="width: 40%;" @click="jump2Admin(1)">用户资金管理</button></p>
          <p><button class="ui button" type="button" style="width: 40%;" @click="jump2Admin(2)">查询上线记录</button></p>
          <p><button class="ui button" type="button" style="width: 40%;" @click="jump2Admin(3)">查询交易记录</button></p>
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
  <el-dialog title="头像上传" id="uploadDialog" v-model="isUploadVisible" width="70%" height="50%">
    <el-upload class="upload-demo" action="" drag :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
    </el-upload>
  </el-dialog>
  <el-dialog :title="infoTitle" v-model="isInfoVisible" width="30%" height="50%">
    <div style="text-align: center;">
      <p>{{ info }}</p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
      let user = window.sessionStorage.getItem("user");
      let id = window.sessionStorage.getItem("userId");
      let url = window.sessionStorage.getItem("photo");
      let isAdmin = (window.sessionStorage.getItem("isAdmin") == "true");
      console.log(isAdmin);
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
          isInfoVisible: false,
          photoUrl: url,
          infoTitle: "",
          info: "",
          isAdmin: isAdmin,
      }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    let self = this;
    if (!userId) {
      this.infoAlert("尚未登录", "请先登录！");
      setTimeout(function() {
        self.$router.push({path: '/login'});
      }, 2000);
      return;
    }
    if (!this.isAdmin) {
      this.$http
        .post("/user/favor/" + userId)
        .then(function(res) {
          res = res.data;
          self.focusList = res;
          self.setData(self.focusList);
        })
        .catch(function(err) {
          self.infoAlert("发生错误", err);
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
          self.infoAlert("发生错误", err);
          self.allBalance = 484300;
        });
      this.$http
        .post("/user/simulate/hold/" + userId)
        .then(function(res) {
          res = res.data;
          self.holdList = res;
          self.setUseful(self.holdList);
        })
        .catch(function(err) {
          self.infoAlert("发生错误", err);
          self.holdList = [
            { name: "富春股份", code: "SZ300299", newValue: 33100.00, delta: -15700.00, deltaRate: -32.17, hold: 5000, newPrice: 6.62, holdPrice: 9.76 }
          ]
          self.setUseful(self.holdList);
        })
    }
  },
  methods: {
    logoff: function() {
      window.sessionStorage.removeItem("userId");
      window.sessionStorage.removeItem("user");
      this.infoAlert("退出登录", "已成功退出登录！即将跳转回主页...")
      let self = this;
      setTimeout(function() {
        self.$router.push({path: '/'});
      }, 2000);
    },
    jump2MyStock: function() {
      this.$router.push({path: '/myStock'});
    },
    jump2Simulate: function() {
      this.$router.push({path: '/simulate'});
    },
    jump2Admin: function(num) {
      this.$router.push({path: '/admin/' + num});
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
        let name = "" + self.userId + ".jpg";
        data.append("photo", blob, name);
        data.append("userId", self.userId);
        this.$http({
          method: 'post',
          url: '/user/upload/photo',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function (res) {
          res = res.data;
          if (res.success) {
            const newdata = new FormData();
            newdata.append("userId", self.userId);
            self.$http({
              method: 'post',
              url: '/user/getPhoto',
              data: newdata,
              headers: { 'Content-Type': 'multipart/form-data' }
            }).then(function(res) {
              res = res.data;
              window.sessionStorage.setItem("photo", res.image_url);
            }).catch(function(err) {
              window.sessionStorage.setItem("photo", "src/test.png");
            });
            self.infoAlert("头像修改", "头像修改成功！即将自动刷新...");
            self.isCropVisible = false;
            self.isUploadVisible = false;
            setTimeout(function() {
              location.reload();
            }, 2000);
          }
        }).catch(function(err) {
          self.infoAlert("发生错误", err);
        })
      })
    },
    jump2Stock: function(id) {
      this.$router.push({
        path: "/stock/" + id
      });
    },
    infoAlert: function(title, word) {
      this.infoTitle = title;
      this.info = word;
      this.isInfoVisible = true;
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