<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center py-6">
      <input
          v-model="searchName"
          @input="filterCharacters"
          placeholder="Search by name"
          class="w-full max-w-xs rounded-md border border-gray-300 shadow-sm px-4 py-2"
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

    <!-- Display the filtered list of characters -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <CharacterCard v-for="character in filteredCharacters" :key="character.id" :character="character" />
    </div>

    <infinite-loading @infinite="loadMore"></infinite-loading>
  </div>
</template>

<script>
import { useCharactersStore } from '../store/characters';
import CharacterCard from '../components/CharacterCard.vue';
import InfiniteLoading from 'v3-infinite-loading';

export default {
  components: {
    CharacterCard,
    InfiniteLoading,
  },
  setup() {
    const { characters, fetchPage, setFilteredCharacters } = useCharactersStore();

    // Fetch the first page of data
    fetchPage();

    // Variables to hold the filters
    const searchName = ref('');
    const filterStatus = ref('');

    // Computed property for the filtered list of characters
    const filteredCharacters = computed(() => {
      const nameFilter = searchName.value.trim().toLowerCase();
      const statusFilter = filterStatus.value;

      // Filter by name and status
      return characters.filter((character) => {
        const nameMatch = character.name.toLowerCase().includes(nameFilter);
        const statusMatch = !statusFilter || character.status === statusFilter;
        return nameMatch && statusMatch;
      });
    });

    // Method to perform character filtering
    const filterCharacters = () => {
      setFilteredCharacters(filteredCharacters.value);
    };

    // Variables to control pagination
    const page = ref(1);
    const loading = ref(false);

    // Method to load the next page of data
    const loadMore = async (state) => {
      if (loading.value) return;

      loading.value = true;
      page.value += 1;
      await fetchPage(page.value);
      loading.value = false;

      state.loaded();
    };

    return {
      searchName,
      filterStatus,
      filteredCharacters,
      filterCharacters,
      loadMore,
      loading,
    };
  },
};
</script>
