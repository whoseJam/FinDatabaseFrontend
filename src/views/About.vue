<script setup>
import Navigator from '../components/Navigator.vue'
import About from "../components/About.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="关于" />
    </header>

    <main>
      <About />
    </main>
  </div>
</template>
