<script setup>
import Navigator from '../components/Navigator.vue'
import Login from "../components/Login.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="登录" />
    </header>

    <main>
      <Login />
    </main>
  </div>
</template>
