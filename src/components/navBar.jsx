import { Link } from '@tanstack/react-router';
import Pokeball from '../assets/pokeball-icon.webp';

const NavBar = () => {
  return (
    <nav className='bg-gray-800 p-4  w-full z-50'>
      <div className='flex items-center justify-between max-w-7xl mx-auto'>
        <Link to='/'>
          <div className='flex items-center space-x-2'>
            <img src={Pokeball} alt='Pokemon Logo' className='w-8 h-8' />
            <h1 className='text-gray-300 text-xl font-bold'>Pokémon Battle</h1>
          </div>
        </Link>

        <div className='flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0'>
          <Link to='/' className='text-gray-300 hover:text-white px-3 py-2 rounded-md'>
            Create team
          </Link>
          <Link to='/battle' className='text-gray-300 hover:text-white px-3 py-2 rounded-md'>
            Battle
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
