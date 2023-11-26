<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>用户名</label>
            <input id="username" type="text" name="username" placeholder="用户名" />
          </div>
          <div class="field">
            <label>密码</label>
            <input id="password" type="password" name="password" placeholder="密码" />
          </div>
          <button class="ui button" type="button" @click="onLogin">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onLogin: function() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      this.$http
        .post("/user/login", {
          username: username,
          password: password
        })
        .then(function(res) {
          let success = res.success;
          if (!success) {
            alert(res.message);
            return;
          }
          window.sessionStorage.setItem("userId", res.userId);
          window.sessionStorage.setItem("user", username);
        })
        .catch(function(err) {
          alert(err);
        })
    }
  }
}
</script>