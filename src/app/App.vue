<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import HelloWorld from 'src/features/top/views/components/HelloWorld.vue'
import { watch } from 'vue'
import { authService } from 'src/shared/authn/views/variables/authService'
import { paths } from 'src/shared/routes/paths'

const router = useRouter()
const route = useRoute()

// TODO: consider moving below to router guard
watch(
  [authService, route],
  async () => {
    console.log('loggedIn?', authService.getIsLoggedIn())
    console.log(
      'route.path === window.location.pathname',
      window.location.pathname === paths.authCallback,
    )

    if (authService.getIsLoggedIn() === true) {
      return
    }

    if (authService.getIsLoggedIn() === false && window.location.pathname === paths.authCallback) {
      return
    }

    await router.push({
      path: paths.logIn,
    })
  },
  { immediate: true },
)
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="src/shared/views/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
