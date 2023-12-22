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
      <MyPending />
    </main>
  </div>
</template>