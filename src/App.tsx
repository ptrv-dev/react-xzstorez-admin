import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appAxios from './axios';

import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import CategoriesPage from './pages/CategoriesPage';

import ASide from './components/ASide';

import { login, logout } from './store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from './store/store';

import style from './scss/App.module.scss';

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

  return (
    <main className={style.main}>
      <ASide />
      <div className={style.body}>
        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path="/product-create" element={<ProductCreatePage />} />
          <Route path="/product/:id" element={<ProductEditPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
