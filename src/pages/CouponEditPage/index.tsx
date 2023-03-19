import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CouponItem } from '../../@types/serverResponse';
import appAxios from '../../axios';
import Button from '../../components/Button';
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import SaveIcon from '../../components/Icons/SaveIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import Input from '../../components/Input';
import LoadingPage from '../LoadingPage';

interface FormFields {
  name: string;
  coupon: string;
  percent: string;
}

const CouponEditPage: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<CouponItem>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchCoupon = async () => {
    try {
      const { data } = await appAxios.get<CouponItem>(`/coupon/${id}`);
      setData(data);
      setValue('name', data.name);
      setValue('coupon', data.coupon);
      setValue('percent', data.percent.$numberDecimal);
    } catch (error) {
      console.log(error);
      alert("Can't fetch coupon...");
    }
  };

  React.useEffect(() => {
    fetchCoupon();
  }, [id]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    try {
      await appAxios.patch(`/coupon/${id}`, data);
      alert('Coupon successfully edited!');
      navigate('/coupons');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't edit coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('Do you really want to delete a coupon?')) return;
    setLoading(true);
    try {
      await appAxios.delete(`/coupon/${id}`);
      alert('Coupon successfully deleted!');
      navigate('/coupons');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't delete coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate('/coupons');

  if (!data) return <LoadingPage />;

  return (
    <div className="section">
      <h3>Create coupon</h3>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            placeholder="Enter name here..."
            name="name"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              minLength: { value: 3, message: 'Min length 3' },
              maxLength: { value: 256, message: 'Max length 256' },
            }}
            error={errors.name?.message || Boolean(errors.name)}
          />
        </div>
        <div className="field">
          <label htmlFor="coupon">Coupon</label>
          <Input
            type="text"
            placeholder="Enter coupon here..."
            name="coupon"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              minLength: { value: 3, message: 'Min length 3' },
              maxLength: { value: 64, message: 'Max length 64' },
            }}
            error={errors.coupon?.message || Boolean(errors.coupon)}
          />
        </div>
        <div className="field">
          <label htmlFor="percent">Percent</label>
          <Input
            type="text"
            placeholder="Enter percent here..."
            name="percent"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              pattern: {
                value: /(^\d+$)|(^\d+\.\d{1,2}$)/gm,
                message: 'Invalid percent! Example 10 or 10.5',
              },
            }}
            error={errors.percent?.message || Boolean(errors.percent)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Button type="submit" loading={loading} icon={<SaveIcon />}>
            Save
          </Button>
          <Button
            type="button"
            color="danger"
            loading={loading}
            icon={<TrashIcon />}
            onClick={handleRemove}
          >
            Delete
          </Button>
          <Button
            color="gray"
            type="button"
            loading={loading}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CouponEditPage;
