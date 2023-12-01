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
</template>

<script>
export default {
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
        alert("用户名不能为空！");
        return;
      } else if (password.length == 0) {
        alert("密码不能为空！");
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
      })
        .then(function(res) {
          res = res.data;
          let success = res.success;
          if (!success) {
            alert(res.message);
            return;
          }
          window.sessionStorage.setItem("userId", res.userId);
          window.sessionStorage.setItem("user", username);
          self.$router.push({path: '/userMain'});
        })
        .catch(function(err) {
          alert("登录时遇到错误：" + err);
          window.sessionStorage.setItem("userId", "233");
          window.sessionStorage.setItem("user", "666");
          self.$router.push({path: '/userMain'});
        })
    }
  }
}
</script>