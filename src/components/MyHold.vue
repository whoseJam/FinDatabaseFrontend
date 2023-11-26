<template>
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
      holdList: [
        { name: "富春股份", code: "SZ300299", newValue: 33100.00, delta: -15700.00, deltaRate: -32.17, hold: 5000, newPrice: 6.62, holdPrice: 9.76 }
      ]
    }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (!userId) return;
    this.$http
      .post("/stock/simulate/hold/" + userId)
      .then(function(res) {
        this.holdList = res;
      })
      .catch(function(err) {
        alert(err);
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