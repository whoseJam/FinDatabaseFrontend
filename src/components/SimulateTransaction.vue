<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>股票代码</label>
            <input id="stockId" type="text" name="code" placeholder="请输入股票代码或名称" />
          </div>
          
          <div class="field">
            <label>委托方式</label>
            <div class="ui compact menu">
              <div class="ui simple dropdown item">
                <span>{{ transactionType }}</span>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item" @click="setTransactionType('限价委托')">限价委托</div>
                  <div class="item" @click="setTransactionType('市价委托')">市价委托</div>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label>
              {{ action === "buy" ? "购入价格" : "售出价格" }}
            </label>
            <input id="price" type="text" name="price" placeholder="请输入价格" />
          </div>
          <div class="field">
            <label>
              {{ action === "buy" ? "购入股数" : "售出股数" }}
            </label>
            <input id="size" type="text" name="size" placeholder="请输入数量" />
          </div>

          <button class="ui button" @click="launchTransaction">
            {{ action === "buy" ? "买入" : "卖出" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      transactionType: "限价委托"
    }
  },
  props: {
    action: {
      default: "buy"
    }
  },
  methods: {
    setTransactionType: function(type) {
      this.transactionType = type;
    },
    launchTransaction: function() {
      let price = +document.getElementById("price").value;
      let size = +document.getElementById("size").value;
      let stockId = document.getElementById("stockId").value;
      let action = (this.action === "buy" ? "买" : "卖");
      let type = this.transactionType;
      let userId = window.sessionStorage.getItem("userId");
      this.$http
        .post("/stock/order", {
          userId: userId,
          stockId: stockId,
          action: action,
          price: price,
          size: size,
          type: type
        })
        .then(function(res) {
          res = res.data;
          alert(res.message);
        })
        .catch(function(err) {
          alert(err);
        })
    }
  }
}
</script>