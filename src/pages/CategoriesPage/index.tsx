import React from 'react';
import { useNavigate } from 'react-router-dom';
import appAxios from '../../axios';

import Button from '../../components/Button';
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';

import LoadingPage from '../LoadingPage';

import { CategoryItem, CategoryResponse } from '../../@types/serverResponse';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
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
        <Button
          icon={<FolderPlusIcon />}
          onClick={() => {
            navigate('/category-create');
          }}
        >
          Create category
        </Button>
      </div>
      <table className="table">
        <thead>
          <th style={{ width: '20rem' }}>ID</th>
          <th>Title</th>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              onClick={() => {
                navigate(`/category/${category._id}`);
              }}
              key={category._id}
            >
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
