<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment" style="width: 50%; margin: auto;">
        <h1 class="ui header" style="text-align: center;">
        用户登录
        </h1>
        <form class="ui form" style="width: 80%; margin: auto;">
          <div class="field">
            <label>用户名</label>
            <input id="username" type="text" name="username" placeholder="用户名" />
          </div>
          <div class="field">
            <label>密码</label>
            <input id="password" type="password" name="password" placeholder="密码" />
          </div>
          <button class="ui button" type="button" @click="onLogin">登录</button>
        </form>
      </div>
    </div>
  </div>
  <el-dialog title="登录出错！" id="error" v-model="isVisible" width="50%" height="50%">
    <div style="text-align: center;">
      <p>{{ information }}</p>
      <button v-if="isDebugUseful" class="ui button" @click="debug(false)">离线Debug</button>
      <button v-if="isDebugUseful" class="ui button" @click="debug(true)">离线管理员Debug</button>
      <button class="ui button" @click="quit">确定</button>
    </div>
  </el-dialog>
  <el-dialog title="登录成功！" id="error" v-model="isSuccess" width="30%" height="50%">
    <div style="text-align: center;">
      <p>即将自动跳转至用户主页...</p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      information: "",
      isVisible: false,
      isDebugUseful: false,
      isSuccess: false
    }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (userId) {
      alert("您已经登录过了！");
      this.$router.push({path: '/'});
      return;
    }
  },
  methods: {
    onLogin: function() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let self = this;
      if (username.length == 0) {
        this.showError("用户名不能为空！");
        return;
      } else if (password.length == 0) {
        this.showError("密码不能为空！");
        return;
      }
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      this.$http({
        method: "post",
        url: "/user/login",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function(res) {
        res = res.data;
        let success = res.success;
        if (!success) {
          self.showError(res.message);
          return;
        }
        const newdata = new FormData();
        newdata.append("userId", id);
        self.$http({
          method: 'post',
          url: 'user/getPhoto',
          data: newdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function(res) {
          res = res.data;
          window.sessionStorage.setItem("photo", res.image_url);
        })
        .catch(function(err) {
          window.sessionStorage.setItem("photo", "src/test.png");
        });
        self.isSuccess = true;
        window.sessionStorage.setItem("userId", res.userId);
        window.sessionStorage.setItem("user", username);
        setTimeout(function() {
          self.$router.push({path: '/userMain'});
        }, 2000);
      }).catch(function(err) {
        self.showError("登录时遇到错误：" + err);
        self.isDebugUseful = true;
      })
    },
    showError: function(word) {
      this.information = word;
      this.isVisible = true;
    },
    debug: function(isAdmin) {
      window.sessionStorage.setItem("userId", "233");
      window.sessionStorage.setItem("user", "666");
      window.sessionStorage.setItem("photo", "src/test.png");
      window.sessionStorage.setItem("isAdmin", isAdmin);
      this.$router.push({path: '/userMain'});
    },
    quit: function() {
      this.isVisible = false;
      this.isDebugUseful = false;
    }
  }
}
</script>