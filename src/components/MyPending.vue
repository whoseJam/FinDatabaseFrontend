<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <h3 class="ui header">我的委托</h3>
        <input id="agree" type="checkbox" name="agree" v-model="checked"/>仅显示未完成委托
      </div>

      <div class="ui segment">
        <table class="ui unstackable table">
          <thead>
            <tr>
              <th>委托时间</th>
              <th>委托价</th>
              <th>委托数量</th>
              <th>完成状况</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pendingList">
              <td v-if="!item.finished || !checked">
                <div class="vertical masthead segment">
                  <div>{{ item.name }}</div>
                  <div>
                    <div :style="['display: inline-block', { color: item.type === 'buy' ? 'red' : 'green' }]">{{ item.type === "buy" ? "买" : "卖" }}</div>
                    <div style="display: inline-block">{{ getDateString(item.time) }}</div>
                  </div>
                </div>
              </td>
              <td v-if="!item.finished || !checked">{{ item.price }}</td>
              <td v-if="!item.finished || !checked">{{ item.size }}</td>
              <td v-if="!item.finished || !checked">{{ (item.finished)? "已完成" : "未完成" }}</td>
              <td v-if="!item.finished">
                <button class="ui negative button" @click="rollback(item.orderId)">撤单</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      pendingList: [],
      checked: false
    }
  },
  mounted: function() {
    let userId = window.sessionStorage.getItem("userId");
    if (!userId) return;
    let self = this;
    console.log("get my pending userid=", userId)
    this.$http
      .post("/user/simulate/order/" + userId)
      .then(function(res) {
        res = res.data;
        self.pendingList = res;
      })
      .catch(function(err) {
        alert(err);
        self.pendingList = [
          { name: "黄山旅游", type: "buy", time: "23:07:06", price: 11.29, size: 1000, finished: false },
          { name: "黄山旅游", type: "buy", time: "13:07:06", price: 11.28, size: 1000, finished: true },
        ]
      })
  },
  methods: {
    rollback: function(orderId) {
      console.log(orderId);
      const newdata = new FormData();
      newdata.append("orderId", orderId);
      this.$http({
          method: 'post',
          url: '/user/rollback',
          data: newdata,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(function(res) {
          res = res.data;
          alert(res.message);
          location.reload();
        }).catch(function(err) {
          alert(err);
        })
    },
    getDateString: function(value) {
      value *= 1000;
      let date = new Date(Number(value));
      return ("" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
              + date.getHours() + ":" + date.getMinutes());
    },
  }
}
</script>