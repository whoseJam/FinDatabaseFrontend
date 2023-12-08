<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment" style="width: 50%; margin: auto;">
        <h1 class="ui header" style="text-align: center;">
        新用户注册
        </h1>
        <form class="ui form" style="width: 80%; margin: auto;">
          <div class="field">
            <label>用户名 <font color=red>*</font></label>
            <input id="username" type="text" name="username" placeholder="用户名" />
          </div>
          <div class="field">
            <label>密码 <font color=red>*</font>（8-20位，建议包含大小写字母、数字及符号以提高安全性）</label>
            <input id="password" type="password" name="password" placeholder="密码" />
          </div>
          <div class="field">
            <label>确认密码 <font color=red>*</font></label>
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="确认密码" />
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <input id="email" type="text" name="email" placeholder="电子邮箱" />
          </div>
          <div class="field">
            <label id="codetxt">验证码  <font color=red>*</font> 请输入答案：{{ question }}</label>
            <input id="code" type="text" name="code" placeholder="验证码" />
          </div>
          <div class="field">
            <label>
              <input id="agree" type="checkbox" name="agree" />
              我同意《股票查询及模拟交易平台使用说明》
            </label>
          </div>
          <button class="ui button" type="button" @click="onRegister">注册</button>
        </form>
      </div>
    </div>
  </div>
  <el-dialog title="注册出错！" id="error" v-model="isVisible" width="50%" height="50%">
    <div style="text-align: center;">
      <p>{{ information }}</p>
      <button class="ui button" @click="quit">确定</button>
    </div>
  </el-dialog>
  <el-dialog title="注册成功！" id="error" v-model="isSuccess" width="30%" height="50%">
    <div style="text-align: center;">
      <p>即将自动跳转至登录页面...</p>
    </div>
  </el-dialog>
</template>

<script>
  var answer;

export default {
  data: function() {
    var tmp1 = Math.trunc(Math.random() * 20) + 1;
    var tmp2 = Math.trunc(Math.random() * 20) + 1;
    var type = Math.trunc(Math.random() * 4);
    var word;
    if (type == 0) {
      answer = tmp1 + tmp2;
      word = "" + tmp1 + " + " + tmp2 + " = ？"
    } else if (type == 1) {
      answer = tmp1 - tmp2;
      word = "" + tmp1 + " - " + tmp2 + " = ？"
    } else if (type == 2) {
      answer = tmp1 * tmp2;
      word = "" + tmp1 + " * " + tmp2 + " = ？"
    } else if (type == 3) {
      tmp2 = tmp2 % 4 + 1;
      answer = Math.trunc(tmp1 / tmp2);
      word = "" + tmp1 + " / " + tmp2 + " = ？（取整数部分）"
    }
    return {
      question: word,
      information: "",
      isVisible: false,
      isSuccess: false,
    }
  },
  methods: {
    onRegister: function() {
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let confirm = document.getElementById("confirmPassword").value;
      let email = document.getElementById("email").value;
      let agree = document.getElementById("agree");
      let code = document.getElementById("code").value;
      if (!agree.checked) {
        this.showError("请阅读并勾选同意《股票查询及模拟交易平台使用说明》");
        return;
      } else if (username.length == 0) {
        this.showError("用户名不能为空！");
        return;
      } else if (password !== confirm) {
        this.showError("密码与确认密码不一致");
        return;
      } else if (password.length == 0) {
        this.showError("密码不能为空！");
        return;
      } else if (password.length < 8) {
        this.showError("密码过短！密码长度应介于8-20位之间。");
        return;
      } else if (password.length > 20) {
        this.showError("密码过长！密码长度应介于8-20位之间。");
        return;
      } else if (answer != code) {
        this.showError("验证码错误！");
        return;
      }
      let self = this;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      this.$http({
        method: 'post',
        url: '/user/register',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function(res) {
        res = res.data;
        if (!res.success) {
          self.showError(res.message);
          return;
        }
        self.isSuccess = true;
        setTimeout(function() {
          self.$router.push({path: '/login'});
        }, 2000);
      }).catch(function(err) {
        self.showError(err);
      })
    },
    showError: function(word) {
      this.information = word;
      this.isVisible = true;
    },
    quit: function() {
      this.isVisible = false;
    }
  }
}
</script>