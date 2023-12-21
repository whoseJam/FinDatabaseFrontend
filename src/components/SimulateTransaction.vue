<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment" style="width: 80%; margin: auto;">
        <form class="ui form" @submit.native.prevent>
          <div class="field">
            <label>股票代码</label>
            <input id="stockId" type="text" v-model="stockId" placeholder="请输入股票代码" />
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
            <input id="price" type="text" :placeholder="priceWord"/>
          </div>
          <div class="field">
            <label>
              {{ action === "buy" ? "购入股数" : "售出股数" }}
            </label>
            <input id="size" type="text" placeholder="请输入数量"/>
          </div>

          <button class="ui button" @click="launchTransaction">
            {{ action === "buy" ? "买入" : "卖出" }}
          </button>
        </form>
      </div>
    </div>
  </div>
  <el-dialog :title="infoTitle" v-model="isInfoVisible" width="30%" height="50%">
    <div style="text-align: center;">
      <p>{{ info }}</p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      transactionType: "限价委托",
      stockId: "",
      priceWord: "请输入价格",
      infoTitle: "",
      isInfoVisible: false,
      info: ""
    }
  },
  props: {
    action: {
      default: "buy"
    }
  },
  mounted: function() {
    this.stockId = this.$route.query.id;
  },
  methods: {
    setTransactionType: function(type) {
      this.transactionType = type;
      if (type == "市价委托") {
        document.getElementById("price").value = "";
        this.priceWord = "该类别委托不可手动指定价格";
        document.getElementById("price").setAttribute("disabled", "true");
      } else {
        this.priceWord = "请输入价格";
        this.priceDis = "";
        document.getElementById("price").removeAttribute("disabled");
      }
    },
    launchTransaction: function() {
      let price = +document.getElementById("price").value;
      let size = +document.getElementById("size").value;
      let stockId = document.getElementById("stockId").value;
      let action = (this.action === "buy" ? "买" : "卖");
      let type = this.transactionType;
      let userId = window.sessionStorage.getItem("userId");
      let self = this;

      if (stockId.length != 6) {
        this.infoAlert("输入不合法", "请正确填写股票代码！");
        return;
      } else if (price <= 0 && type == "限价委托") {
        this.infoAlert("输入不合法", "请正确填写合法价格！");
        return;
      } else if (size <= 0) {
        this.infoAlert("输入不合法", "请正确填写合法股数！");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("stockId", stockId);
      formData.append("action", action);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("type", type);

      this.$http({
        method: "post",
        url: "/user/order",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function(res) {
        res = res.data;
        if (res.success) {
          self.infoAlert("提交成功", res.message);
          self.$router.push({path: '/simulateRegret'});
        } else {
          self.infoAlert("提交失败", res.message);
        }
      }).catch(function(err) {
        self.infoAlert("提交失败", err);
      })
    },
    infoAlert: function(title, word) {
      this.infoTitle = title;
      this.info = word;
      this.isInfoVisible = true;
    }
  }
}
</script>