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
    this.$http
      .post("/stock/news")
      .then(function(data) {
        this.articles = data;
      })
      .catch(function(err) {
        alert(err);
      })
  }
}
</script>
