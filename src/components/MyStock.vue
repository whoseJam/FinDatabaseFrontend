<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <h1 class="ui header">
          我的自选
        </h1>
      </div>
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
          <tr v-for="item in focusList">
            <td>
              <div class="vertical masthead segment">
                <div>{{ item.name }}</div>
                <div>{{ item.code }}</div>
              </div>
            </td>
            <td :style="computeStyle(item.deltaRate)">
              {{ item.newPrice }}
            </td>
            <td :style="computeStyle(item.deltaRate)">
              {{ item.deltaRate }}%
            </td>
            <td :style="computeStyle(item.deltaRate)">
              {{ item.delta }}
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      focusList: []
    }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (!userId) return;
    let self = this;
    this.$http
      .post("/user/favor/" + userId)
      .then(function(res) {
        res = res.data;
        self.focusList = res;
      })
      .catch(function(err) {
        alert(err);
        self.focusList = [
          { name: "富春股份", code: "SZ300299", newPrice: 6.62, deltaRate: -7.76, delta: -0.55 },
          { name: "永泰能源", code: "SH600157", newPrice: 1.36, deltaRate: 0.00, delta: 0.00 },
          { name: "白云机场", code: "SH600004", newPrice: 10.63, deltaRate: 0.85, delta: 0.09 },
          { name: "浦发银行", code: "SH600000", newPrice: 6.89, deltaRate: -0.72, delta: -0.05 }
        ]
      })
  },
  methods: {
    computeStyle: function(delta) {
      let eps = 1e-4;
      if (Math.abs(delta) <= eps) return "color: black";
      else if (delta > 0) return "color: red";
      return "color: green";
    }
  }
}
</script>