<template>
  <div>
    <div class="ui vertical masthead center aligned segment">
      <div class="ui text container">

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
    </div>
  </div>

</template>

<script>
function isDigit(ch) {
  return "0" <= ch && ch <= "9";
}

export default {
  data: function() {
    return {};
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