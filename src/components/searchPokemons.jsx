// src/features/teams/components/SearchPokemon.jsx
import { useState, useMemo } from 'react';

import { useAllPokemons, usePokemonTypes } from '../api/hook/usePokemons';

import { useTeamStore } from '../features/teams/store/store';

import Loading from './loading';
import PokemonCard from './pokemonCard';

const SearchPokemon = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const LIMIT_POKEMONS = 200;

  const { data: listData, isLoading } = useAllPokemons(LIMIT_POKEMONS);
  const { data: types } = usePokemonTypes();
  const addPokemon = useTeamStore(s => s.addPokemonToDraft);

  const filtered = useMemo(() => {
    if (!listData?.results) return [];
    return listData.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [listData, search]);

  return (
    <section className='w-full shadow rounded-xl px-4 max-h-[595px] flex flex-col'>
      <h3 className='text-xl font-semibold mb-4'>Search Pokémon</h3>
      <div className='flex gap-4 mb-4'>
        <input
          type='text'
          placeholder='Search by name...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='border border-gray-300 rounded px-3 py-1 w-1/2'
        />

        <select
          onChange={e => setTypeFilter(e.target.value)}
          value={typeFilter}
          className='border bg-gray-900 rounded px-3 py-1'
        >
          <option value='all'>All Types</option>
          {types?.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 && !isLoading && (
        <div className='text-center text-gray-400'>Pokémon not found</div>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <div className='overflow-y-auto max-h-full custom-scrollbar'>
          <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
            {filtered.map(({ name }) => (
              <PokemonCard key={name} name={name} onSelect={addPokemon} typeFilter={typeFilter} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchPokemon;
