<template>
  <div>
    <div class="ui vertical masthead center aligned segment">
      <div class></div>
      <div class="ui text container">

        <div class="ui segment">
          <h1 class="ui huge header">
            FinDatabase
          </h1>

          <h2 class="ui large header">搜索你想要查询的股票</h2>
          
          <div class="ui search">
            <i class="search icon"></i>
            <div class="ui input">
              <input id="stockId" type="text" placeholder="股票代码">
              <button class="ui button" @click="searchStock">搜索</button>
            </div>
          </div>
        </div>

        <div class="ui segment">
          <div class="ui header">昨日表现最佳股票</div>
          <table class="ui single line table">
            <thead>
              <tr>
                <th>股票名称</th>
                <th>股票代码</th>
                <th>涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in topkList">
                <td>{{ item.name }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.deltaRate }}</td>
              </tr>
            </tbody>
          </table>          
        </div>

      </div>
    </div>
  </div>

</template>

<script>
function isDigit(ch) {
  return "0" <= ch && ch <= "9";
}

export default {
  data: function() {
    return {
      topkList: []
    };
  },
  mounted: function() {
    let self = this;
    this.$http
      .post("/stock/best/" + 5)
      .then(function(res) {
        res = res.data;
        self.topkList = res;
      })
      .catch(function(err) {
        alert(err);
        self.topkList = [
          { "name": "富春股份", "code": "SZ300299", "deltaRate": -7.76 },
          { "name": "永泰能源", "code": "SH600157", "deltaRate": 0 },
          { "name": "白云机场", "code": "SH600004", "deltaRate": 0.85 },
          { "name": "浦发银行", "code": "SH600000", "deltaRate": -0.72 }]
      })
  },
  methods: {
    checkValid: function(code) {
      if (code.length !== 6) return false;
      for (let i = 0; i < code.length; i++)
        if (!isDigit(code[i])) return false;
      return true;
    },
    searchStock: function() {
      let stockId = document.getElementById("stockId").value;
      this.$router.push({
        path: "/stock/" + stockId
      });
    }
  }
}
</script>