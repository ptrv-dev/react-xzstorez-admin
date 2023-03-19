import React from 'react';
import { Route, Routes } from 'react-router-dom';
import appAxios from './axios';

import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductEditPage from './pages/ProductEditPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryCreatePage from './pages/CategoryCreatePage';
import CategoryEditPage from './pages/CategoryEditPage';
import BrandsPage from './pages/BrandsPage';
import BrandCreatePage from './pages/BrandCreatePage';
import BrandEditPage from './pages/BrandEditPage';
import CouponsPage from './pages/CouponsPage';
import CouponCreatePage from './pages/CouponCreatePage';

import ASide from './components/ASide';

import { login, logout } from './store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from './store/store';

import style from './scss/App.module.scss';
import CouponEditPage from './pages/CouponEditPage';

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
          <Route path="/category-create" element={<CategoryCreatePage />} />
          <Route path="/category/:id" element={<CategoryEditPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand-create" element={<BrandCreatePage />} />
          <Route path="/brand/:id" element={<BrandEditPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/coupons/create" element={<CouponCreatePage />} />
          <Route path="/coupon/:id" element={<CouponEditPage />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
