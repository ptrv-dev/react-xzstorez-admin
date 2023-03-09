import React from 'react';
import { useNavigate } from 'react-router-dom';
import appAxios from '../../axios';

import LoadingPage from '../LoadingPage';

import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import Button from '../../components/Button';

import { BrandItem, BrandResponse } from '../../@types/serverResponse';

const BrandsPage: React.FC = () => {
  const navigate = useNavigate();

  const [brands, setBrands] = React.useState<BrandItem[]>([]);

  const fetchBrands = async () => {
    try {
      const { data } = await appAxios.get<BrandResponse>('/brand');
      setBrands(data.data);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...Can't fetch brands");
    }
  };

  React.useEffect(() => {
    fetchBrands();
  }, []);

  if (!brands) return <LoadingPage />;

  return (
    <div className="section">
      <div className="section-header">
        <h3>Brands</h3>
        <Button
          icon={<FolderPlusIcon />}
          onClick={() => {
            navigate('/brand-create');
          }}
        >
          Create brand
        </Button>
      </div>
      <table className="table">
        <thead>
          <th style={{ width: '20rem' }}>ID</th>
          <th>Title</th>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr
              onClick={() => {
                navigate(`/brand/${brand._id}`);
              }}
              key={brand._id}
            >
              <td>{brand._id}</td>
              <td>{brand.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandsPage;
