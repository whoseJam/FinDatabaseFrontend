<script setup>
import Navigator from '../components/Navigator.vue'
import FullView from "../components/FullView.vue"
</script>

<template>
    <div id="root">
      <header>
        <Navigator activeItem="总览" />
      </header>

      <main>
        <FullView />
      </main>
    </div>
  </template>