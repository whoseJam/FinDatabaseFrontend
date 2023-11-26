<script setup>
import MyHold from './MyHold.vue';
</script>

<template>
  <div class="ui container">
    <div class="ui vertical masthead segment">
      <div class="ui segment">
        <h1 class="ui header">
          我的模拟
        </h1>
      </div>
      <div class="ui segment">
        <div class="ui segment">
          <h1 class="ui header">总资产</h1>
          <span class="ui header">484300.00</span>
        </div>
        <div class="ui segment">
          <div class="ui three column stackable center aligned grid">
            <div class="middle aligned row">
              <div class="column">
                <h5 class="ui header">总市值</h5>
                <span>33100.00</span>
              </div>
              <div class="column">
                <h5 class="ui header">总盈亏</h5>
                <span>-15700.00</span>
              </div>
              <div class="column">
                <h5 class="ui header">可用资金</h5>
                <span>451200.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ui segment">
        <div class="ui five column stackable center aligned grid">
          <div class="middle aligned row">
            <div class="column">
              <router-link to="/simulateBuy">
                <i class="sign in alternate icon"></i><br>
                <span>买入</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateSell">
                <i class="sign out alternate icon"></i><br>
                <span>卖出</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateRegret">
                <i class="backward icon"></i><br>
                <span>撤单</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateHold">
                <i class="money bill alternate icon"></i><br>
                <span>持仓</span>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/simulateQuery">
                <i class="window restore icon"></i><br>
                <span>查询</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <MyHold />
    </div>
  </div>
</template>