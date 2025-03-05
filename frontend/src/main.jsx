import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { baseRoutes } from './route.jsx';
import './index.css';
import queryClient from './queryConfig/queryClient.config.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={baseRoutes} />
  </QueryClientProvider>
);
