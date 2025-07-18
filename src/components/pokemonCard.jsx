import { usePokemonDetails } from '../api/hook/usePokemons';
import Loading from './loading';

const PokemonCard = ({ name, onSelect, typeFilter }) => {
  const { data, isLoading } = usePokemonDetails(name);

  if (isLoading) return <Loading />;

  if (!data) return null;

  const matchesType = typeFilter === 'all' || data.types.some(t => t.type.name === typeFilter);

  if (!matchesType) return null;

  return (
    <li className='max-w-72 bg-gray-800 rounded-xl shadow-md hover:cursor-pointer transition-transform transform'>
      <button
        className='w-full p-3 text-center flex flex-col items-center'
        onClick={() => onSelect(data)}
      >
        <img
          src={data.sprites.other['official-artwork'].front_default || data.sprites.front_default}
          alt={name}
          className='w-24 h-24 object-contain mb-2 transition-all duration-200 hover:scale-105 '
        />
        <p className='font-semibold capitalize opacity-80 mb-3'>{name}</p>
        <div className='flex gap-2 flex-wrap justify-center'>
          {data.types.map(t => (
            <span
              key={t.type.name}
              className='text-xs px-2 py-1 capitalize rounded-full bg-gray-400 text-slate-900 font-semibold'
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </button>
    </li>
  );
};

export default PokemonCard;
