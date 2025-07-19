import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTeamStore } from '../store/store';
import { getStat } from '../../../utils';

export const TeamBuilder = () => {
  const draftTeam = useTeamStore(s => s.draftTeam);
  const reorder = useTeamStore(s => s.reorderDraftTeam);
  const remove = useTeamStore(s => s.removePokemonFromDraft);
  const save = useTeamStore(s => s.saveTeam);
  const clear = useTeamStore(s => s.clearDraft);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = event => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = draftTeam.findIndex(p => p.name === active.id);
    const newIndex = draftTeam.findIndex(p => p.name === over.id);
    const newOrder = arrayMove(draftTeam, oldIndex, newIndex);
    reorder(newOrder);
  };

  const sortByAttack = () => {
    const sorted = [...draftTeam].sort((a, b) => {
      const atkA = getStat(a, 'attack');
      const atkB = getStat(b, 'attack');
      return atkB - atkA;
    });
    reorder(sorted);
  };

  const shuffleTeam = () => {
    const shuffled = [...draftTeam]
      .map(p => ({ ...p, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort);
    reorder(shuffled);
  };

  return (
    <section className='w-72 flex flex-col shadow rounded-xl px-4 '>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-semibold'>Current Team ({draftTeam.length}/6)</h3>
        <button onClick={clear} className='text-sm text-red-500 hover:underline'>
          Clear Draft
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={draftTeam.map(p => p.name)} strategy={verticalListSortingStrategy}>
          <ul className='flex flex-col gap-4'>
            {draftTeam.map(p => (
              <SortablePokemon key={p.name} pokemon={p} onRemove={remove} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className='mt-6 flex flex-wrap gap-4'>
        <button
          onClick={() => {
            const name = prompt('Name Team  :');
            if (name.length) save(name);
          }}
          disabled={draftTeam.length < 6}
          className='w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50'
        >
          Save Team
        </button>

        <button
          disabled={draftTeam.length < 6}
          onClick={sortByAttack}
          className='w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50'
        >
          Order by Attack
        </button>

        <button
          disabled={draftTeam.length < 6}
          onClick={shuffleTeam}
          className='w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
        >
          Random Order
        </button>
      </div>
    </section>
  );
};

const SortablePokemon = ({ pokemon, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: pokemon.name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 200ms ease',
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className='relative bg-gray-800 rounded-lg p-3 shadow text-center cursor-move'
    >
      <div
        {...attributes}
        {...listeners}
        className='font-bold capitalize inline-block mb-1 cursor-move select-none'
        title='Drag to reorder'
      >
        {pokemon.name}
      </div>
      <p className='text-xs text-gray-400'>
        ATK: {getStat(pokemon, 'attack')} | DEF: {getStat(pokemon, 'defense')}
      </p>
      <button
        className='absolute top-1 right-2 text-red-500 hover:text-red-700'
        onClick={e => {
          e.stopPropagation();
          onRemove(pokemon.name);
        }}
        title='Remove Pokémon'
        type='button'
      >
        ×
      </button>
    </li>
  );
};
