<script setup>
import Navigator from '../components/Navigator.vue'
import News from "../components/News.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="新闻" />
    </header>

    <main>
      <News />
    </main>
  </div>
</template>
