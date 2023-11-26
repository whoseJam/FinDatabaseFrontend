<script setup>
import Navigator from '../components/Navigator.vue';
import MyHold from "../components/MyHold.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator />
    </header>

    <main>
      <div class="ui container">
        <div class="ui vertical masthead segment">
          <div class="ui segment">
            <div class="ui header">我的持仓</div>
          </div>
          <div class="ui segment">
            <MyHold />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>