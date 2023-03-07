import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProductsPage from './pages/ProductsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductsPage />,
  },
  {
    path: '*',
    element: <h1>Page not found! Error 404</h1>,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
