<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <h1 class="ui header">
          我的自选
        </h1>
      <div class="ui segment" style="height: 300px">
        <h1 class="ui header">
          自选总览
        </h1>
        <div id="chart" style="width: 40%;height:90%;position: absolute;left: 10%;" :key="refreshKey"></div>
        <div id="pie" style="width: 40%;height:70%;position: absolute;left: 50%;" :key="refreshKey"></div>
      </div>
      <table class="ui unstackable table">
        <thead>
          <tr>
            <th>名称</th>
            <th>最新价</th>
            <th>涨跌幅</th>
            <th>涨跌额</th>
            <th>操作</th>
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
            <td >
              <button class="ui button" type="button" style="width: 40%;" @click="buy(item.code)">委托买入</button>
              <button class="ui button" type="button" style="width: 40%;" @click="remove(item.code)">移出自选</button>
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
        self.setGraph(self.focusList);
      })
      .catch(function(err) {
        alert(err);
        self.focusList = [
          { name: "富春股份", code: "SZ300299", newPrice: 6.62, deltaRate: -7.76, delta: -0.55 },
          { name: "永泰能源", code: "SH600157", newPrice: 1.36, deltaRate: 0.00, delta: 0.00 },
          { name: "白云机场", code: "SH600004", newPrice: 10.63, deltaRate: 0.85, delta: 0.09 },
          { name: "浦发银行", code: "SH600000", newPrice: 6.89, deltaRate: -0.72, delta: -0.05 }
        ];
        self.setGraph(self.focusList);
      });
  },
  methods: {
    computeStyle: function(delta) {
      let eps = 1e-4;
      if (Math.abs(delta) <= eps) return "color: black";
      else if (delta > 0) return "color: red";
      return "color: green";
    },
    setGraph: function(list) {
      var up = 0;
      var flat = 0;
      var down = 0;
      for (var i = 0; i < list.length; i++) {
        if (Math.abs(list[i].deltaRate) <= 1e-4) flat++;
        else if (list[i].deltaRate > 0) up++;
        else down++;
      }
      var chart = echarts.init(document.getElementById("chart"));
      var optionC = {
          tooltip: {},
          legend: {
              data:['股票数']
          },
          xAxis: {
              data: ["上涨股票","下跌股票","持平股票"]
          },
          yAxis: {},
          series: [{
              name: '股票数',
              type: 'bar',
              data: [up, down, flat]
          }]
      };
      chart.setOption(optionC, true);
      var pie = echarts.init(document.getElementById("pie"));
      var optionP = {
        color: ["red", "green", "gray"],
        series : [
          {
            name: '自选总览',
            type: 'pie',
            radius: '70%',
            data:[
              {value:up, name:'上涨股票'},
              {value:down, name:'下跌股票'},
              {value:flat, name:'持平股票'},
            ],
          }
        ]
      };
      pie.setOption(optionP, true);
    },
    buy: function(stockId) {
      stockId = stockId.substring(2);
      this.$router.push({path: '/simulateBuy', query: {id: stockId}});
    },
    remove: function(stockId) {
      alert("还没写：似乎没找到后端的对应接口");
      location.reload();
    }
  }
}
</script>