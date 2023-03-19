import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import appAxios from '../../axios';
import Button from '../../components/Button';
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import TagIcon from '../../components/Icons/TagIcon';
import Input from '../../components/Input';

interface FormFields {
  name: string;
  coupon: string;
  percent: string;
}

function generateCoupon(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const CouponCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleGenerate = () => {
    setValue('coupon', generateCoupon(6).toUpperCase());
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    try {
      await appAxios.post('/coupon', data);
      alert('New coupon successfully created!');
      navigate('/coupons');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't create coupon");
    } finally {
      setLoading(false);
    }
  };
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
          <Button type="submit" loading={loading} icon={<FolderPlusIcon />}>
            Create
          </Button>
          <Button type="button" icon={<TagIcon />} onClick={handleGenerate}>
            Generate coupon
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CouponCreatePage;
