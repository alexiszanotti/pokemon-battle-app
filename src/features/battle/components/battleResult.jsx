const BattleResult = ({ result }) => {
  return (
    <div className='bg-gray-800 p-4 rounded shadow mt-4'>
      <h3 className='text-xl font-semibold text-center mb-4'>Combat Result</h3>

      <div className='grid grid-cols-2 gap-4 text-center mb-6'>
        <div>
          <p className='text-lg font-bold'>Team A</p>
          <p>🟢 Alive: {result.teamA.alive}</p>
          <p>⚫️ Weakened: {result.teamA.down}</p>
        </div>
        <div>
          <p className='text-lg font-bold'>Team B</p>
          <p>🟢 Alive: {result.teamB.alive}</p>
          <p>⚫️ Weakened: {result.teamB.down}</p>
        </div>
      </div>

      <h4 className='text-center font-semibold mb-2'>Rounds</h4>
      <ul className='space-y-2'>
        {result.rounds.map(r => (
          <li key={r.index} className='border rounded p-2 text-sm bg-gray-700 text-center'>
            <strong>Round {r.index}:</strong> {r.p1} vs {r.p2} → 🏆{' '}
            <span className='font-bold'>{r.winner}</span>
          </li>
        ))}
      </ul>

      <h4 className='text-center text-xl mt-6 font-bold'>🏁 Winner: {result.winner}</h4>
    </div>
  );
};

export default BattleResult;
