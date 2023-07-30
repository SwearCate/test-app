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
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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

.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}
.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

</style>

