import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appAxios from './axios';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';

import ProductsPage from './pages/ProductsPage';
import { login, logout } from './store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from './store/store';

import style from './scss/App.module.scss';
import ASide from './components/ASide';

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
        </Routes>
      </div>
    </main>
  );
};

export default App;
