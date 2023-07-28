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
        async fetchCharacter(id) {
            const response = await axios.get(`${BASE_URL}/character/${id}`);
            return response.data;
        },
        setFilteredCharacters(filteredCharacters) {
            this.filteredCharacters = filteredCharacters;
        },
    },
});
