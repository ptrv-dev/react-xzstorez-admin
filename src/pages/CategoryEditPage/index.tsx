import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import appAxios from '../../axios';

import LoadingPage from '../LoadingPage';

import Button from '../../components/Button';
import Input from '../../components/Input';

import SaveIcon from '../../components/Icons/SaveIcon';
import TrashIcon from '../../components/Icons/TrashIcon';

import style from '../CategoryCreatePage/CategoryCreatePage.module.scss';

import { CategoryItem } from '../../@types/serverResponse';

interface FormFields {
  title: string;
}

const CategoryEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryItem>();

  const fetchCategory = async () => {
    try {
      const { data } = await appAxios.get<CategoryItem>(`/category/${id}`);
      setCategory(data);
      setValue('title', data.title);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...Can't fetch category");
    }
  };

  React.useEffect(() => {
    fetchCategory();
  }, [id]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    try {
      await appAxios.patch(`/category/${id}`, data);
      alert('Category successfully edited!');
      navigate('/categories');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't edit category");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm('Do you really want to delete a category?')) {
      try {
        await appAxios.delete(`/category/${id}`);
        alert('Category successfully deleted!');
        navigate('/categories');
      } catch (error) {
        console.log(error);
        alert("Something going wrong...\nCan't delete category");
      }
    }
  };
  const handleCancel = () => navigate('/categories');

  if (!category) return <LoadingPage />;

  return (
    <div className="section">
      <h3>Edit category</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.field}>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            placeholder="Enter title here..."
            name="title"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              minLength: { value: 4, message: 'Min length 4' },
              maxLength: { value: 128, message: 'Max length 128' },
            }}
            error={errors.title?.message || Boolean(errors.title)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Button type="submit" loading={loading} icon={<SaveIcon />}>
            Save
          </Button>
          <Button
            type="button"
            color="danger"
            icon={<TrashIcon />}
            onClick={handleRemove}
          >
            Remove
          </Button>
          <Button type="button" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEditPage;
