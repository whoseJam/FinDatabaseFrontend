<script setup>
import KLineChart from "./KLineChart.vue";
</script>

<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <h1 class="ui header">
          {{ stockId }} : {{ companyName }}
          <button class="ui button" type="button" @click="choose" style="position: absolute; left:88%">添加自选</button></h1>
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
        data = data.data;
        self.introduce = data.introduce;
        self.companyName = data.companyName;
      })
      .catch(function(err) {
        alert(err);
      })
  },
  methods: {
    choose: function() {
      let self = this;
      let userId = window.sessionStorage.getItem("userId");
      if (!userId) {
        alert("股票 " + this.stockId + " 添加自选失败！原因：请先登录！");
        self.$router.push({path: '/login'});
        return;
      }
      const formData = new FormData();
      formData.append("stockId", this.stockId);
      formData.append("userId", userId);

      this.$http({
        method: 'post',
        url: '/user/addfavor',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(function(res) {
          res = res.data;
          if (res.success) {
            alert("股票 " + self.stockId + " 已成功加入自选！");
          } else {
            alert("股票 " + self.stockId + " 添加自选失败！原因：" + res.message);
          }
        })
        .catch(function(err) {
          alert(err);
        })
    }
  }
}
</script>