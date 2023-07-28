<template>
  <div>
    <input v-model="searchName" @input="filterCharacters" placeholder="Search by name" />

    <select v-model="filterStatus" @change="filterCharacters">
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>

    <!-- Отображение отфильтрованного списка персонажей -->
  </div>
</template>

<script>
import { useCharactersStore } from '../store/characters';

export default {
  setup() {
    const { characters } = useCharactersStore();

    // Переменные для хранения фильтров
    const searchName = ref('');
    const filterStatus = ref('');

    // Вычисляемое свойство для отфильтрованного списка персонажей
    const filteredCharacters = computed(() => {
      const nameFilter = searchName.value.trim().toLowerCase();
      const statusFilter = filterStatus.value;

      // Фильтрация по имени и статусу
      return characters.characters.filter((character) => {
        const nameMatch = character.name.toLowerCase().includes(nameFilter);
        const statusMatch = !statusFilter || character.status === statusFilter;
        return nameMatch && statusMatch;
      });
    });

    // Метод для выполнения фильтрации персонажей
    const filterCharacters = () => {
      characters.setFilteredCharacters(filteredCharacters.value);
    };

    return {
      searchName,
      filterStatus,
      filteredCharacters,
      filterCharacters,
    };
  },
};
</script>
