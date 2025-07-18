import { render, screen, fireEvent } from '@testing-library/react';
import BattlePage from '../../routes/battle.jsx';
import { useTeamStore } from '../../features/teams/store/store.js';
import { it, vi, expect, beforeEach, describe } from 'vitest';

// Mockear Zustand
vi.mock('../../features/teams/store/store.js', async () => {
  const original = await vi.importActual('../../features/teams/store/store.js');
  return {
    ...original,
    useTeamStore: vi.fn(),
  };
});

const mockTeam = (name, id, atk = 80, def = 60, speed = 90) => ({
  id,
  name,
  pokemons: [
    {
      name: name + '_poke1',
      stats: [
        { stat: { name: 'attack' }, base_stat: atk },
        { stat: { name: 'defense' }, base_stat: def },
        { stat: { name: 'speed' }, base_stat: speed },
      ],
    },
  ],
});

describe('BattlePage UI', () => {
  beforeEach(() => {
    useTeamStore.mockImplementation(selector =>
      selector({
        teams: [mockTeam('Alpha', 'a'), mockTeam('Beta', 'b')],
      })
    );
  });

  it('must simulate combat and show a winner', () => {
    render(<BattlePage />);

    // Seleccionar equipos
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'a' } });
    fireEvent.change(selects[1], { target: { value: 'b' } });

    // Click en el botón "Pelear"
    const button = screen.getByRole('button', { name: /fight/i });
    fireEvent.click(button);

    // Verificar resultado
    expect(screen.getByRole('heading', { name: /combat result/i })).toBeInTheDocument();

    expect(screen.getByText(/winner/i)).toBeInTheDocument();
    expect(screen.getAllByText(/round/i).length).toBeGreaterThan(0);
  });
});
