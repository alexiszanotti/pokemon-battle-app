import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPokemon from '../../components/searchPokemons';
import { vi, describe, expect, it } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Simple mocks for data hooks
vi.mock('../../../../api/hooks/usePokemons', () => ({
  useAllPokemons: () => ({
    data: {
      results: [{ name: 'pikachu' }, { name: 'charmander' }, { name: 'bulbasaur' }],
    },
    isLoading: false,
  }),
  usePokemonTypes: () => ({
    data: [{ name: 'electric' }, { name: 'fire' }],
  }),
  usePokemonDetails: name => ({
    data: {
      name,
      types: [{ type: { name: 'electric' } }],
      stats: [],
    },
    isLoading: false,
  }),
}));

describe('SearchPokemon', () => {
  it('shows results according to search', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <SearchPokemon />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText(/name/i);
    fireEvent.change(input, { target: { value: 'char' } });

    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });
});
