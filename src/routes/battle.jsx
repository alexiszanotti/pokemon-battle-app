import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import BattleResult from '../features/battle/components/battleResult';
import CreateBattle from '../features/battle/components/createBattle';

export const Route = createFileRoute('/battle')({
  component: BattlePage,
});

export default function BattlePage() {
  const [result, setResult] = useState(null);

  return (
    <div className='p-4 max-w-4xl mx-auto space-y-6'>
      <CreateBattle setResult={setResult} />

      {result && <BattleResult result={result} />}
    </div>
  );
}
