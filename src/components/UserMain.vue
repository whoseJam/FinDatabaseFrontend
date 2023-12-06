<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <h1 class="ui header">
        用户主页
      </h1>

      <div class="ui segment" style="float:left; width: 40%; height:400px">
        <h3 class="ui header">用户信息</h3>
        <p>用户名：<b>{{ username }}</b></p>
        <p>用户ID：<b>{{ userId }}</b></p>
        <p>这里放什么好呢？</p>
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
</template>

<script>
export default {
  data: function() {
      let user = window.sessionStorage.getItem("user");
      let id = window.sessionStorage.getItem("userId");
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
          allDelta: null
      }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (!userId) {
      alert("请先登录！");
      this.$router.push({path: '/login'});
      return;
    }
    let self = this;
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
    }
  }
}
</script>