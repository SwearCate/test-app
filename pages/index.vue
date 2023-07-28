<template>
  <div>
    <!-- Input для поиска по имени -->
    <input v-model="searchName" @input="filterCharacters" placeholder="Search by name" />

    <!-- Select для фильтрации по статусу -->
    <select v-model="filterStatus" @change="filterCharacters">
      <option value="">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>

    <!-- Вывод списка персонажей с использованием v-for -->
    <ul>
      <li v-for="character in filteredCharacters" :key="character.id">
        <nuxt-link :to="'/character/' + character.id">
          <!-- Имя персонажа, кликабельное и ведущее на страницу персонажа -->
          {{ character.name }}
        </nuxt-link>
        <!-- Разновидность персонажа -->
        <p>{{ character.species }}</p>
        <!-- Картинка персонажа -->
        <img :src="character.image" :alt="character.name" />
        <!-- Список эпизодов с его участием, ограниченный пятью записями и кликабельный -->
        <ul>
          <li v-for="episode in character.episodes.slice(0, 5)" :key="episode.id">
            <nuxt-link :to="'/episode/' + episode.id">{{ episode.name }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "/store";

export default {
  setup() {
    const { characters } = useStore();

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
      characters.fetchCharacters(); // Вызов метода для загрузки всех персонажей с API
    };

    // Загрузка списка персонажей при первом рендере компонента
    onMounted(() => {
      characters.fetchCharacters();
    });

    return {
      searchName,
      filterStatus,
      filteredCharacters,
      filterCharacters,
    };
  },
};
</script>
