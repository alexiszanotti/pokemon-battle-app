import SearchPokemon from './components/searchPokemons';
import { TeamBuilder } from './features/teams/components/teamBuilder';

function App() {
  return (
    <div className=' w-full flex '>
      <TeamBuilder />
      <SearchPokemon />
    </div>
  );
}

export default App;
