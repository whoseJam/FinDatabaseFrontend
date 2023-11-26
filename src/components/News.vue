<template>
  <div class="ui container">
    <div class="ui vertical mathead segment">
      <div class="ui very relaxed items">
        <div v-for="object in articles" class="ui item"
          style="background-color: #fff; box-shadow: 0 1px 2px 0 rgba(34,36,38,.15); padding: 1em 1em;">
          <div class="image">
            <img src="https://picss.sunbangyan.cn/2023/11/05/42259fbfb9d534be75b377f2ff0a6fae.jpg">
          </div>
          <div class="content">
            <a class="ui header" :href="object.link">
              {{ object.title }}
            </a>
            <div class="description">
              <p>{{ object.brief }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      articles: []
    }
  },
  mounted: function() {
    let self = this;
    this.$http
      .post("/stock/news")
      .then(function(data) {
        self.articles = data;
      })
      .catch(function(err) {
        alert(err);
        self.articles = [
          {
            "title": "扁鹊医书如何重现于世？穿越千年走近“天回医简” ",
            "brief": "成都北郊的金牛区天回镇，地铁3号线从地下穿城而过，十字路口的军区总医院站如今人来人往。11年前，就在这里的地铁施工建设时，一个古墓葬群被意外发现。",
            "link": "http://news.cyol.com/gb/articles/2023-11/05/content_77yQYyFe3M.html"
          },
          {
            "title": "人形机器人板块领涨市场，将出现颠覆性产品？",
            "brief": "消息面上，11月2日，工信部印发《人形机器人创新发展指导意见》（下称《意见》），推动人形机器人产业高质量发展，培育形成新质生产力，高水平赋能新型工业化，有力支撑现代化产业体系建设。",
            "link": "https://fund.eastmoney.com/a/202311042894356218.html"
          }
        ]
      })
  }
}
</script>
