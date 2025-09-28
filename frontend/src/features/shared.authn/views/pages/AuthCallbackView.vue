<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { paths } from 'src/shared/router/paths'
import { sessionStorageService } from 'src/shared/storage/views/sessionStorageService'
import { AFTER_LOGIN_PATH_SESSION_STORAGE_KEY } from '../router/constants/sessionStorage'

const router = useRouter()

onMounted(async () => {
  const redirectToResult = sessionStorageService.get(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY)

  if (!redirectToResult.isSuccess) {
    await router.push(paths.top)
    return
  }

  sessionStorageService.remove(AFTER_LOGIN_PATH_SESSION_STORAGE_KEY)
  await router.push(redirectToResult.data)
})
</script>
