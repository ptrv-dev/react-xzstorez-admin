import React from 'react';
import { useNavigate } from 'react-router-dom';

import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';

import Button from '../../components/Button';
import { CouponItem, CouponsResponse } from '../../@types/serverResponse';
import appAxios from '../../axios';

const CouponsPage: React.FC = () => {
  const [coupons, setCoupons] = React.useState<CouponItem[]>([]);

  const fetchCoupons = async () => {
    try {
      const { data } = await appAxios.get<CouponsResponse>('/coupon');
      setCoupons(data.data);
    } catch (error) {
      console.log(error);
      alert("Can't fetch coupons...");
      setCoupons([]);
    }
  };
  React.useEffect(() => {
    fetchCoupons();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="section-header">
        <h3>Coupons</h3>
        <Button
          icon={<FolderPlusIcon />}
          onClick={() => {
            navigate('/coupons/create');
          }}
        >
          Create coupon
        </Button>
      </div>
      <table className="table">
        <thead>
          <th style={{ width: '20rem' }}>ID</th>
          <th>Name</th>
          <th>Coupon</th>
          <th style={{ width: '5rem' }}>Percent</th>
          <th style={{ width: '5rem' }}>Uses</th>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr
              key={coupon._id}
              onClick={() => navigate(`/coupon/${coupon._id}`)}
            >
              <td>{coupon._id}</td>
              <td>{coupon.name}</td>
              <td>{coupon.coupon}</td>
              <td>{coupon.percent.$numberDecimal}</td>
              <td>{coupon.uses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsPage;
