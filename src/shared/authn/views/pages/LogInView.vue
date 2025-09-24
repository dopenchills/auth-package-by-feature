<template>
  <div class="main">
    <h1>This is an login page</h1>
    <button @click="async () => await authService.logIn()">login</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import { authService } from '../variables/authService'
</script>
