import { defineStore } from 'pinia';
import axios from 'axios';

export const useCharactersStore = defineStore({
    id: 'characters',
    state: () => ({
        characters: [],
        filteredCharacters: [],
    }),
    actions: {
        async fetchPage(page = 1, name = '', status = '') {
            const response = await axios.get('https://rickandmortyapi.com/api/character', {
                params: {
                    page,
                    name,
                    status,
                },
            });
            this.characters.push(...response.data.results);
        },
        async fetchCharacter(id) {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            return response.data;
        },
        setFilteredCharacters(characters) {
            this.filteredCharacters = characters;
        },
    },
});
