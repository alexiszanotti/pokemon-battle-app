import { useState } from 'react';
import { useTeamStore } from '../../teams/store/store';
import { simulateBattle } from '../utils';

const CreateBattle = ({ setResult }) => {
  const teams = useTeamStore(s => s.teams);

  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');

  const teamA = teams.find(t => t.id === teamAId);
  const teamB = teams.find(t => t.id === teamBId);

  const handleFight = () => {
    if (teamA && teamB) {
      const battleResult = simulateBattle(teamA.pokemons, teamB.pokemons);
      setResult(battleResult);
    }
  };
  return (
    <>
      <h2 className='text-2xl font-bold text-center'>Combat Simulator </h2>

      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <select
          className='bg-gray-800 border px-4 py-2 rounded'
          value={teamAId}
          onChange={e => setTeamAId(e.target.value)}
        >
          <option value=''>Select Team A</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          className=' bg-gray-800 border px-4 py-2 rounded'
          value={teamBId}
          onChange={e => setTeamBId(e.target.value)}
        >
          <option value=''>Select Team B</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFight}
        disabled={!teamA || !teamB || teamAId === teamBId}
        className='block mx-auto bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50'
      >
        Fight!
      </button>
    </>
  );
};

export default CreateBattle;
