import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import ProductsPage from './pages/ProductsPage';
import { useAppSelector } from './store/store';

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
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) return <LoginPage />;

  return <RouterProvider router={router} />;
};

export default App;
