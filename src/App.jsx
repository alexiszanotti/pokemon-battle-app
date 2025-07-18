import SearchPokemon from './components/SearchPokemons';
import { TeamBuilder } from './features/teams/components/TeamBuilder';

function App() {
  return (
    <div className='p-4 mx-auto space-y-6 w-full flex h-full max-h-full'>
      <TeamBuilder />
      <SearchPokemon />
    </div>
  );
}

export default App;
