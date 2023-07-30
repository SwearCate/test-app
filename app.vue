<template>
  <div>
    <!-- Общий хедер приложения -->
    <header>
      <!-- Навигационное меню -->
      <nav>
        <nuxt-link to="/">Home</nuxt-link>
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

