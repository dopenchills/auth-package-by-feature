<template>
  <button @click="async () => await authService.logIn()">login</button>
</template>

<script setup lang="ts">
import { authService } from '../variables/authService'
</script>
