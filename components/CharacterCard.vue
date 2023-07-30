<template>
  <nuxt-link :to="`/character/${character.id}`">
    <div class="p-4 shadow rounded bg-white">
      <img :src="character.image" class="h-12 w-12 rounded-full" alt="Character Image" />
      <div class="p-4">
        <h2 class="text-l font-bold">{{ character.name }}</h2>
        <p class="text-gray-600 mt-1">{{ character.species }}</p>
        <p class="text-gray-600">{{ character.location.name }}</p>
        <ul>
          <li v-for="episode in episodes" :key="episode.id">
            <nuxt-link :to="`/episode/${episode.id}`">{{ episode.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      episodes: [],
    };
  },
  async created() {
    // Fetch the first five episodes
    const episodeIds = this.character.episode.slice(0, 5).map((url) => url.split('/').pop());
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
    this.episodes = response.data;
  },
};
</script>
