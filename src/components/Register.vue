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
          <div class="field">
            <label>确认密码</label>
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="确认密码" />
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <input id="email" type="text" name="email" placeholder="电子邮箱" />
          </div>
          <button class="ui button" type="button" @click="onRegister">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onRegister: function() {
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      let confirm = document.getElementById("confirmPassword");
      let email = document.getElementById("email");
      if (password !== confirm) {
        alert("密码与确认密码不一致");
        return;
      }
      this.$http
        .post("/user/register", {
          username: username,
          password: password,
          email: email
        })
        .then(function(res) {
          if (!res.success) {
            alert(res.message);
            return;
          }
          alert(res.message);
          setTimeout(function() {
            this.$router.push({path: '/login'});
          }, 3000);
        })
        .catch(function(err) {
          alert(err);
        })
    }
  }
}
</script>