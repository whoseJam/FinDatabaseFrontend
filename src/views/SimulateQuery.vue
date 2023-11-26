<script setup>
import { callWithAsyncErrorHandling } from 'vue';
import Navigator from '../components/Navigator.vue';
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
            <h1 class="ui header">我也没想好这里要查询什么</h1>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>