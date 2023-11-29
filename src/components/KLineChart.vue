<template>
  <div id="chart" style="width:100%; height:100%; ">
  </div>
</template>

<script>
import { init, dispose } from 'klinecharts'
export default {
  data: function() {
    return {
      chart: null,
    };
  },
  props: {
    stockId: {
      type: String,
      default: "600000"
    }
  },
  watch: {
    stockId: {
      handler(newVal, oldVal) {
        let chart = this.chart;
        this.$http
          .post("/stock/kline/" + newVal)
          .then(function(data) {
            console.log("data=",data);
            data = data.data;
            console.log(data);
            chart.applyNewData(data);
          })
          .catch(function(err) {
            alert(err);
            chart.applyNewData(
              [
                {
                  "close": 4976.16,
                  "high": 4977.99,
                  "low": 4970.12,
                  "open": 4972.89,
                  "timestamp": 1587660000000,
                  "volume": 204
                },
                {
                  "close": 4977.33,
                  "high": 4979.94,
                  "low": 4971.34,
                  "open": 4973.2,
                  "timestamp": 1587660060000,
                  "volume": 194
                },
                {
                  "close": 4977.93,
                  "high": 4977.93,
                  "low": 4974.2,
                  "open": 4976.53,
                  "timestamp": 1587660120000,
                  "volume": 197
                },
                {
                  "close": 4966.77,
                  "high": 4968.53,
                  "low": 4962.2,
                  "open": 4963.88,
                  "timestamp": 1587660180000,
                  "volume": 28
                },
                {
                  "close": 4961.56,
                  "high": 4972.61,
                  "low": 4961.28,
                  "open": 4961.28,
                  "timestamp": 1587660240000,
                  "volume": 184
                },
                {
                  "close": 4964.19,
                  "high": 4964.74,
                  "low": 4961.42,
                  "open": 4961.64,
                  "timestamp": 1587660300000,
                  "volume": 191
                },
                {
                  "close": 4968.93,
                  "high": 4972.7,
                  "low": 4964.55,
                  "open": 4966.96,
                  "timestamp": 1587660360000,
                  "volume": 105
                },
                {
                  "close": 4979.31,
                  "high": 4979.61,
                  "low": 4973.99,
                  "open": 4977.06,
                  "timestamp": 1587660420000,
                  "volume": 35
                }
              ]
            )
          })
      }
    }
  },
  mounted: function() {
    const chart = init('chart')
    this.chart = chart;
  },
  unmounted: function() {
    dispose('chart');
  }
}
</script>