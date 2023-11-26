<script setup>
import Navigator from '../components/Navigator.vue';
import SimulateTransaction from '../components/SimulateTransaction.vue';
</script>

<template>
  <div id="root">
    <header>
      <Navigator />
    </header>

    <main>
      <SimulateTransaction action="buy"></SimulateTransaction>
    </main>
  </div>
</template>