import { Outlet } from '@tanstack/react-router';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-900 text-white'>
      <NavBar />
      <main className='flex-1 container mx-auto py-4'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
