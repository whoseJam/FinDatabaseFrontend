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
            <label>密码（8-20位，建议包含大小写字母、数字及符号以提高安全性）</label>
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
          <div class="field">
            <label>
              <input id="agree" type="checkbox" name="agree" placeholder="电子邮箱" />
              我同意《股票查询及模拟交易平台使用说明》
            </label>
          </div>
          <button class="ui button" type="button" @click="onRegister">注册</button>
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
      let agree = document.getElementById("agree");
      if (!agree.checked) {
        alert("请阅读并勾选同意《股票查询及模拟交易平台使用说明》");
        return;
      } else if (username.value.length == 0) {
        alert("用户名不能为空！");
        return;
      } else if (password.value !== confirm.value) {
        alert("密码与确认密码不一致");
        return;
      } else if (password.value.length == 0) {
        alert("密码不能为空！");
        return;
      } else if (password.value.length < 8) {
        alert("密码过短！密码长度应介于8-20位之间。");
        return;
      } else if (password.value.length > 20) {
        alert("密码过长！密码长度应介于8-20位之间。");
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