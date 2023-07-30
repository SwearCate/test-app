<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nuxt-link to="/" class="text-lg font-bold mb-4 inline-block">Home</nuxt-link>

    <h1 class="text-3xl font-bold">{{ episode.name }}</h1>
    <p class="text-gray-600 mt-2">Дата премьеры: {{ episode.air_date }}</p>
    <h2 class="text-2xl font-bold mt-4">Персонажи:</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import CharacterCard from '../../components/CharacterCard.vue';

export default {
  components: {
    CharacterCard,
  },
  data() {
    return {
      episode: {},
      characters: [],
    };
  },
  async created() {
    const route = useRoute();
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${route.params.id}`);
    this.episode = response.data;

    // Fetch all characters
    const characterIds = this.episode.characters.map((url) => url.split('/').pop());
    const charactersResponse = await axios.get(`https://rickandmortyapi.com/api/character/${characterIds}`);
    this.characters = charactersResponse.data;
  },
};
</script>
