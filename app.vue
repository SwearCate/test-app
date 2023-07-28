<template>
  <div>
    <!-- Общий хедер приложения -->
    <header>
      <h1>My Nuxt Appdd</h1>
      <!-- Навигационное меню -->
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/character">Character</nuxt-link>
        <nuxt-link to="/episode">Episode</nuxt-link>
      </nav>
    </header>

    <!-- Контент текущей страницы -->
    <main>
      <router-view />
    </main>

    <!-- Общий футер приложения -->
    <footer>
    </footer>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>

