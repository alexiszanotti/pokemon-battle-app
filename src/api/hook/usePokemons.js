// src/api/hooks/usePokemons.js
import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemons, fetchPokemonTypes, fetchPokemonDetails } from '../pokemon';

export const useAllPokemons = (limit = 100, offset = 0) =>
  useQuery({
    queryKey: ['allPokemons', limit, offset],
    queryFn: () => fetchAllPokemons(limit, offset),
  });

export const usePokemonTypes = () =>
  useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: fetchPokemonTypes,
  });

export const usePokemonDetails = (urlOrId, enabled = true) =>
  useQuery({
    queryKey: ['pokemonDetails', urlOrId],
    queryFn: () => fetchPokemonDetails(urlOrId),
    enabled: !!urlOrId && enabled,
  });
