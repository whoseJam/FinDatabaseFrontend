<script setup>
import Navigator from '../components/Navigator.vue'
import Register from "../components/Register.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="注册" />
    </header>

    <main>
      <Register />
    </main>
  </div>
</template>
