<template>
  <div class="ui segment">
    <h1 class="ui header" style="text-align: center;">
      当前总资产&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{{ allBalance }}
    </h1>
    <div class="ui three column stackable center aligned grid">
      <div class="middle aligned row">
        <div class="column">
          <h5 class="ui header">总市值</h5>
          <span><b>{{ allValue }}</b></span>
        </div>
        <div class="column">
          <h5 class="ui header">总盈亏</h5>
          <span :style="computeStyle(allDelta)"><b>{{ allDelta }}</b></span>
        </div>
        <div class="column">
          <h5 class="ui header">可用资金</h5>
          <span><b>{{ allBalance - allValue }}</b></span>
        </div>
      </div>
    </div>
  </div>
  <table class="ui unstackable table">
    <thead>
      <tr>
        <th>名称</th>
        <th>市值</th>
        <th>盈亏</th>
        <th>持仓/可用</th>
        <th>现价/成本</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in holdList">
        <td :style="computeStyle(item.deltaRate)">
          <div class="vertical masthead segment">
            <div>{{ item.name }}</div>
            <div>{{ item.code }}</div>
          </div>
        </td>
        <td :style="computeStyle(item.deltaRate)">
          {{ item.newValue }}
        </td>
        <td :style="computeStyle(item.deltaRate)">
          <div class="vertical masthead segment">
            <div>{{ item.delta }}</div>
            <div>{{ item.deltaRate }}%</div>
          </div>
        </td>
        <td :style="computeStyle(item.deltaRate)">
          {{ item.hold }}
        </td>
        <td :style="computeStyle(item.deltaRate)">
          <div class="vertical masthead segment">
            <div>{{ item.newPrice }}</div>
            <div>{{ item.holdPrice }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: function() {
    return {
      holdList: [],
      allValue: null,
      allDelta: null,
      allBalance: null
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
      .post("/user/simulate/hold/" + userId)
      .then(function(res) {
        res = res.data;
        self.holdList = res;
        self.setDetail(self.holdList);
      })
      .catch(function(err) {
        alert(err);
        self.holdList = [
          { name: "富春股份", code: "SZ300299", newValue: 33100.00, delta: -15700.00, deltaRate: -32.17, hold: 5000, newPrice: 6.62, holdPrice: 9.76 }
        ]
        self.setDetail(self.holdList);
      })
  },
  methods: {
    computeStyle: function(delta) {
      let eps = 1e-4;
      if (Math.abs(delta) <= eps) return "color: black";
      else if (delta > 0) return "color: red";
      return "color: green";
    },
    setDetail: function(list) {
      this.allValue = 0;
      this.allDelta = 0;
      for (var i = 0; i < list.length; i++) {
        this.allValue += list[i].newValue;
        this.allDelta += list[i].delta;
      }
    }
  }
}
</script>