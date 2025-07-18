// src/api/pokemon.js
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchAllPokemons = async (limit = 100, offset = 0) => {
  const res = await axios.get(`${BASE_URL}/pokemon`, {
    params: { limit, offset },
  });
  return res.data;
};

export const fetchPokemonTypes = async () => {
  const res = await axios.get(`${BASE_URL}/type`);
  return res.data.results;
};

export const fetchPokemonDetails = async urlOrId => {
  const res = await axios.get(
    typeof urlOrId === 'string' && urlOrId.startsWith('http')
      ? urlOrId
      : `${BASE_URL}/pokemon/${urlOrId}`
  );
  return res.data;
};
