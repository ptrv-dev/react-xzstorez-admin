import React from 'react';
import appAxios from '../../axios';

import { CategoryItem, CategoryResponse } from '../../@types/serverResponse';
import LoadingPage from '../LoadingPage';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await appAxios.get<CategoryResponse>('/category');
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't fetch categories");
    }
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  if (!categories) return <LoadingPage />;

  return (
    <div className="section">
      <div className="section-header">
        <h3>Categories</h3>
      </div>
      <table className="table">
        <thead>
          <th style={{ width: '20rem' }}>ID</th>
          <th>Title</th>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
