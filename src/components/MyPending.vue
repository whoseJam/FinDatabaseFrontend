<template>
  <table class="ui unstackable table">
    <thead>
      <tr>
        <th>委托时间</th>
        <th>委托价</th>
        <th>委托数量</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in pendingList">
        <td>
          <div class="vertical masthead segment">
            <div>{{ item.name }}</div>
            <div>
              <div :style="['display: inline-block', { color: item.type === 'buy' ? 'red' : 'green' }]">{{ item.type === "buy" ? "买" : "卖" }}</div>
              <div style="display: inline-block;">{{ item.time }}</div>
            </div>
          </div>
        </td>
        <td>{{ item.price }}</td>
        <td>{{ item.size }}</td>
        <td>
          <button class="ui negative button" @click="rollback(item.orderId)">撤单</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: function() {
    return {
      pendingList: []
    }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (!userId) return;
    let self = this;
    console.log("get my pending userid=", userId)
    this.$http
      .post("/stock/simulate/order/" + userId)
      .then(function(res) {
        self.pendingList = res;
      })
      .catch(function(err) {
        alert(err);
        self.pendingList = [
          { name: "黄山旅游", type: "buy", time: "23:07:06", price: 11.29, size: 1000, orderId: 1 }
        ]
      })
  },
  methods: {
    rollback: function(orderId) {
      this.$http
        .post("/rollback", {
          orderId: orderId
        })
        .then(function(res) {
          alert(res.message);
        })
        .catch(function(err) {
          alert(err);
        })
    }
  }
}
</script>