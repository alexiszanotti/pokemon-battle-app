// src/features/teams/store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX_TEAM_SIZE = 6;

export const useTeamStore = create(
  persist(
    (set, get) => ({
      teams: [],
      draftTeam: [],

      addPokemonToDraft: pokemon => {
        const draft = get().draftTeam;
        if (draft.length >= MAX_TEAM_SIZE) return;
        if (draft.find(p => p.name === pokemon.name)) return;

        set({ draftTeam: [...draft, pokemon] });
      },

      removePokemonFromDraft: pokemonName => {
        set({
          draftTeam: get().draftTeam.filter(p => p.name !== pokemonName),
        });
      },

      reorderDraftTeam: newOrder => {
        set({ draftTeam: newOrder });
      },

      clearDraft: () => set({ draftTeam: [] }),

      saveTeam: name => {
        const team = get().draftTeam;
        if (team.length === 0) return;

        const newTeam = {
          id: crypto.randomUUID(),
          name,
          pokemons: [...team],
          createdAt: new Date().toISOString(),
        };

        set(state => ({
          teams: [...state.teams, newTeam],
          draftTeam: [],
        }));
      },

      deleteTeam: id => {
        set(state => ({
          teams: state.teams.filter(t => t.id !== id),
        }));
      },
    }),
    {
      name: 'pokemon-team-store',
      partialize: state => ({
        draftTeam: state.draftTeam,
        teams: state.teams,
      }),
    }
  )
);
