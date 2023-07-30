<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-6">
      <nuxt-link to="/" class="text-lg font-bold">Home</nuxt-link>

      <div class="flex items-center">
        <input
          v-model="searchName"
          @input="filterCharacters"
          placeholder="Search by name"
          class="w-full max-w-xs rounded-md border border-gray-300 shadow-sm px-4 py-2 mr-4"
        />

        <select
          v-model="filterStatus"
          @change="filterCharacters"
          class="rounded-md border border-gray-300 shadow-sm px-4 py-2"
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>

    <!-- Display the filtered list of characters -->
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <CharacterCard
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>

    <infinite-loading @infinite="loadMore"></infinite-loading>
  </div>
</template>

<script>
import { useCharactersStore } from "../store/characters";
import CharacterCard from "../components/CharacterCard.vue";
import InfiniteLoading from "v3-infinite-loading";

export default {
  components: {
    CharacterCard,
    InfiniteLoading,
  },
  setup() {
    const { characters, fetchPage } = useCharactersStore();

    // Variables to hold the filters
    const searchName = ref("");
    const filterStatus = ref("");

    // Method to perform character filtering
    const filterCharacters = async () => {
      // Clear the current list of characters
      characters.length = 0;

      // Fetch the first page of data with the current filters
      await fetchPage(1, searchName.value, filterStatus.value);
    };

    // Variables to control pagination
    const page = ref(1);
    const loading = ref(false);

    // Method to load the next page of data
    const loadMore = async (state) => {
      if (loading.value) return;

      loading.value = true;
      page.value += 1;
      await fetchPage(page.value, searchName.value, filterStatus.value);
      loading.value = false;

      state.loaded();
    };

    // Fetch the first page of data with the initial filters
    fetchPage(1, searchName.value, filterStatus.value);

    return {
      searchName,
      filterStatus,
      characters,
      filterCharacters,
      loadMore,
      loading,
    };
  },
};
</script>
