<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { authService } from '../variables/authService'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  await authService.handleLogInRedirect()

  // TODO: user should be navigated to the path user initially want to get navigated to
  await router.push('/')
})
</script>
