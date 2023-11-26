<script setup>
import Navigator from '../components/Navigator.vue';
import MyPending from "../components/MyPending.vue"
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
            <div class="ui header">我的委托</div>
          </div>
          <div class="ui segment">
            <MyPending />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>