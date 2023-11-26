<script setup>
import Navigator from '../components/Navigator.vue'
import MainPage from "../components/MainPage.vue"
</script>

<template>
  <div id="root">
    <header>
      <Navigator activeItem="主页" />
    </header>

    <main>
      <MainPage />
    </main>
  </div>
</template>
