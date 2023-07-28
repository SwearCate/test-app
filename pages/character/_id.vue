<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col items-center py-6">
      <img :src="character.image" class="w-48 h-48 rounded-full" />
      <h1 class="text-3xl font-bold mt-4">{{ character.name }}</h1>
      <p class="text-lg mt-2">{{ character.species }}</p>
      <p class="text-lg mt-2">{{ character.location.name }}</p>
    </div>
  </div>
</template>

<script>
import { useCharactersStore } from '../../store/characters';

export default {
  async setup(props, { route }) {
    const { fetchCharacter } = useCharactersStore();

    // Fetch the character data
    const character = await fetchCharacter(route.params.id);

    return {
      character,
    };
  },
};
</script>