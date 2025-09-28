<script setup lang="ts">
import { authService } from 'src/features/shared.authn/views/variables/authService'
import { paths } from 'src/shared/router/paths'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav style="display: flex; flex-direction: column">
        <RouterLink :to="paths.top">Home</RouterLink>
        <RouterLink :to="paths.about">About</RouterLink>
        <RouterLink :to="paths.logIn">LogIn</RouterLink>
        <RouterLink :to="paths.authCallback">AuthCallback</RouterLink>
        <button @click="() => authService.logOut()">LogOut</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
