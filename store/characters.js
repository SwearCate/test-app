import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        characters: [],
        filteredCharacters: [],
    }),
    persist: {
        paths: ['characters', 'filteredCharacters'],
    },
    actions: {
        async fetchPage(page = 1) {
            const response = await axios.get(`${BASE_URL}/character?page=${page}`);
            this.characters.push(...response.data.results);
        },
        setFilteredCharacters(filteredCharacters) {
            this.filteredCharacters = filteredCharacters;
        },
    },
});
