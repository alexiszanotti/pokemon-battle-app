import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './index.css';

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
