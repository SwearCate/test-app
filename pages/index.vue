<template>
  <div>
    <input v-model="searchName" @input="filterCharacters" placeholder="Search by name" />

    <select v-model="filterStatus" @change="filterCharacters">
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>

    <!-- Display the filtered list of characters -->
    <div>
      <CharacterCard v-for="character in filteredCharacters" :key="character.id" :character="character" />
      <infinite-loading @infinite="loadMore"></infinite-loading>
    </div>
  </div>
</template>

<script>
import { useCharactersStore } from '../store/characters';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  components: {
    CharacterCard,
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
