import React from 'react';
import { SubmitHandler, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import appAxios from '../../axios';
import Button from '../../components/Button';
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';
import Input from '../../components/Input';

import style from './CategoryCreatePage.module.scss';

interface FormFields {
  title: string;
}

const CategoryCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    try {
      await appAxios.post('/category', data);
      alert('New category successfully created!');
      navigate('/categories');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h3>Create category</h3>
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
        <Button type="submit" loading={loading} icon={<FolderPlusIcon />}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default CategoryCreatePage;
