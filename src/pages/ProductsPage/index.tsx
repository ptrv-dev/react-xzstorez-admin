import React from 'react';
import { useNavigate } from 'react-router-dom';

import appAxios from '../../axios';

import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import SearchIcon from '../../components/Icons/SearchIcon';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { debounce } from '../../utils/debounce';

import { ProductItem, ProductResponse } from '../../@types/serverResponse';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>(search);
  const [products, setProducts] = React.useState<ProductItem[]>([]);

  const fetchProduct = React.useCallback(async () => {
    try {
      const { data } = await appAxios.get<ProductResponse>(
        `/product?q=${searchQuery}`
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
      alert('Something going wrong...');
      setProducts([]);
    }
  }, [searchQuery]);

  React.useEffect(() => {
    debounce(() => setSearchQuery(search), 500)();
  }, [search]);

  React.useEffect(() => {
    fetchProduct();
  }, [searchQuery, fetchProduct]);

  const handleProductClick = (id: string) => navigate(`/product/${id}`);

  return (
    <div className="section">
      <div className="section-header">
        <h2>Products</h2>
        <Button
          icon={<FolderPlusIcon />}
          className="section-header__button"
          onClick={() => {
            navigate('/product-create');
          }}
        >
          Create product
        </Button>
        <Input
          type="text"
          placeholder="Search..."
          icon={<SearchIcon />}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Sizes</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleProductClick(product._id)}
              >
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.description || '—'}</td>
                <td>
                  {product.sizes?.length ? product.sizes.join(', ') : '—'}
                </td>
                <td>{product.category ? product.category.title : '—'}</td>
                <td>{product.brand ? product.brand.title : '—'}</td>
                <td>{Number(product.price.$numberDecimal).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
