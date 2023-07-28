import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

async function getCharacters(page = 1) {
    const response = await axios.get(`${BASE_URL}/character?page=${page}`);
    return response.data;
}

async function getCharacter(id) {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
}

async function getEpisodes(page = 1) {
    const response = await axios.get(`${BASE_URL}/episode?page=${page}`);
    return response.data;
}

async function getEpisode(id) {
    const response = await axios.get(`${BASE_URL}/episode/${id}`);
    return response.data;
}

export { getCharacters, getCharacter, getEpisodes, getEpisode };
