<script setup>
import MyHold from './MyHold.vue';
</script>

<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <h1 class="ui header">
        我的模拟
      </h1>
      <div class="ui segment">
        <div class="ui five column stackable center aligned grid">
          <div class="middle aligned row">
            <div class="column">
              <router-link to="/simulateBuy">
                <i class="sign in alternate icon"></i><br>
                <span>买入</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateSell">
                <i class="sign out alternate icon"></i><br>
                <span>卖出</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateRegret">
                <i class="backward icon"></i><br>
                <span>撤单</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateHold">
                <i class="money bill alternate icon"></i><br>
                <span>持仓</span>
              </router-link>
            </div>
            <div class="column" style="user-select: none;">
              <a @click="showBalanceSet">
                <i class="window restore icon"></i><br>
                <span>资产操作</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <MyHold />
    </div>
  </div>

  <el-dialog title="资产操作" v-model="BalanceSet" width="50%" height="50%">
    <div style="text-align: center;">
      <p>通过此处对自身模拟资产进行充值与扣款操作</p>
      <p><b>注意</b>：单次充值与扣款限额为100000元</p>
      <form class="ui form">
        <div class="field">
          <label>请输入操作金额：</label>
          <input id="num" type="number" name="num" placeholder="操作金额" min="0" max="100000" step="1000" @keyup="limit" style="width: 50%;"/>
        </div>
      </form>
      <br>
      <p>
        <button class="ui positive button" @click="setBalance(true)">充值</button>
        <button class="ui negative button" @click="setBalance(false)">扣款</button>
      </p>
    </div>
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
    return {
      BalanceSet: false,
      isInfoVisible: false,
      infoTitle: "",
      info: ""
    }
  },
  methods: {
    showBalanceSet: function() {
      this.BalanceSet = true;
    },
    setBalance: function(type) {
      let value = +document.getElementById("num").value;
      let id = window.sessionStorage.getItem("userId");
      let self = this;
      const formData = new FormData();
      formData.append("money", value);
      formData.append("userId", id);

      if (type) {
        this.$http({
          method: 'post',
          url: '/user/charge',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function(res) {
          res = res.data;
          if (res.success) {
            self.infoAlert("充值成功", res.message + " 即将自动刷新...");
            self.BalanceSet = false;
            setTimeout(function() {
              location.reload();
            }, 2000);
          } else {
            self.infoAlert("充值失败", "详细信息：" + res.message);
          }
        }).catch(function(err) {
          self.infoAlert("充值失败", "详细信息：" + err);
        })
      } else {
        this.$http({
          method: 'post',
          url: '/user/withdraw',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function(res) {
          res = res.data;
          if (res.success) {
            self.infoAlert("扣款成功", res.message + "即将自动刷新...");
            self.BalanceSet = false;
            setTimeout(function() {
              location.reload();
            }, 2000);
          } else {
            self.infoAlert("扣款失败", "详细信息：" + res.message);
          }
        }).catch(function(err) {
          self.infoAlert("扣款失败", "详细信息：" + err);
        })
      }
    },
    limit: function() {
      let value = +document.getElementById("num").value;
      if (value < 0) {
        document.getElementById("num").value = 0;
      } else if (value > 100000) {
        document.getElementById("num").value = 100000;
      }
    },
    infoAlert: function(title, word) {
      this.infoTitle = title;
      this.info = word;
      this.isInfoVisible = true;
    }
  }
}
</script>
