<template>
  <nuxt-link :to="`/character/${character.id}`">
    <div class="p-4 shadow rounded bg-white">
      <img :src="character.image" class="h-12 w-12 rounded-full" alt="Character Image" />
      <div class="p-4">
        <h2 class="text-l font-bold">{{ character.name }}</h2>
        <p class="text-gray-600 mt-1">{{ character.species }}</p>
        <p class="text-gray-600">{{ character.location.name }}</p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
};
</script>
