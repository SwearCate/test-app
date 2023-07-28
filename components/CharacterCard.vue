<template>
  <div class="p-4 shadow rounded bg-white">
    <div class="flex">
      <div class="flex-shrink-0">
        <img class="h-12 w-12 rounded-full" :src="character.image" alt="Character Image" />
      </div>
      <div class="ml-4">
        <h2 class="text-lg font-semibold">{{ character.name }}</h2>
        <p class="text-gray-600">{{ character.species }}</p>
        <p class="text-gray-600">{{ character.location.name }}</p>
      </div>
    </div>
  </div>
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
