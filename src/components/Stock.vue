<script setup>
import KLineChart from "./KLineChart.vue";
</script>

<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <h1 class="ui header">{{ companyName }}</h1>
        <div class="discription">
          <p>{{ introduce }}</p>
        </div>
      </div>

      <div class="ui center aligned segment" style="height: 400px">
        <KLineChart :stockId="stockId" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      stockId: "600231",
      companyName: "凌源钢铁集团有限责任公司",
      introduce: "凌源钢铁集团有限责任公司（以下简称凌钢）始建于1966年，现已发展成为以钢铁为主业，矿产资源、新能源等多元产业协同发展的大型企业集团，下辖凌钢股份（上市公司）等18个子公司。现有资产总额265亿元，在职职工近1万人。",
    }
  },
  mounted: function() {
    this.stockId = this.$route.params.stockId;
    let self = this;
    this.$http
      .post("/stock/brief/" + this.stockId)
      .then(function(data) {
        self.introduce = data.introduce;
        self.companyName = data.companyName;
      })
      .catch(function(err) {
        alert(err);
      })
  },
  methods: {
  }
}
</script>