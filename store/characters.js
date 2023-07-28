
import { defineStore } from 'pinia';

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        characters: [],
        nextPage: 1,
    }),
    actions: {
        async fetchCharacters() {
            try {
                const response = await fetch(
                    `https://rickandmortyapi.com/api/character/?page=${this.nextPage}`
                );
                const data = await response.json();
                this.characters = [...this.characters, ...data.results];
                this.nextPage = data.info.next ? this.nextPage + 1 : null;
            } catch (error) {
                console.error('Ошибка при загрузке персонажей:', error);
            }
        },
        setFilteredCharacters(filteredCharacters) {
            this.filteredCharacters = filteredCharacters;
        },
    },
});
