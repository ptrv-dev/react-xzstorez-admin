import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import appAxios from './axios';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';

import ProductsPage from './pages/ProductsPage';
import { login, logout } from './store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from './store/store';

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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);

  const checkAuth = async () => {
    try {
      await appAxios.get('/auth/check');
      dispatch(login());
    } catch (error) {
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkAuth();
  });

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (loading) return <LoadingPage />;

  if (!isAuth) return <LoginPage />;

  return <RouterProvider router={router} />;
};

export default App;
