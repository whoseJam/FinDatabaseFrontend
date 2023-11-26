<template>
  <div id="chart" style="width:100%; height:100%; ">
  </div>
</template>

<script>
import { init, dispose } from 'klinecharts'
export default {
  props: {
    stockId: {
      type: String,
      default: "600000"
    }
  },
  mounted: function() {
    const chart = init('chart')
    this.$http
      .post("/stock/kline/" + this.stockId)
      .then(function(data) {
        chart.applyNewData(data);
      })
      .catch(function(err) {
        alert(err);
      })
  },
  unmounted: function() {
    dispose('chart');
  }
}
</script>