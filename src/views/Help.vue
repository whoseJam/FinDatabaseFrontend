<script setup>
import Navigator from '../components/Navigator.vue'
import Help from "../components/Help.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="帮助" />
    </header>

    <main>
      <Help />
    </main>
  </div>
</template>