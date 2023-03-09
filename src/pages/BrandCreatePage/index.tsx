import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import appAxios from '../../axios';

import Button from '../../components/Button';
import FormImage from '../../components/FormImage';
import Input from '../../components/Input';
import FolderPlusIcon from '../../components/Icons/FolderPlusIcon';

import style from './BrandCreatePage.module.scss';

interface FormFields {
  title: string;
}

const BrandCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = React.useState<File>();

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
  };

  const handleImageRemove = () => {
    window.confirm('Do you really want to delete an image?') &&
      setImage(undefined);
  };

  const imageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await appAxios.post('/upload', formData);

      return data.path;
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't upload image");
    }
    return '';
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!image) return alert('Please select an image!');
    try {
      const imageUrl = await imageUpload(image);

      const brand = {
        image: imageUrl,
        title: data.title,
      };

      console.log(brand);

      await appAxios.post('/brand', brand);

      alert('New brand successfully created!');

      navigate('/brands');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't create brand");
    }
  };

  return (
    <div className="section">
      <div className="section-header">
        <h3>Brand edit</h3>
      </div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          hidden
          ref={inputFileRef}
          onChange={handleFile}
          accept="image/png, image/jpeg, image/webp"
        />
        <div className={style.field}>
          <label>Image</label>
          <div className={style.row}>
            {image ? (
              <FormImage href={image} onRemove={handleImageRemove} />
            ) : (
              <FormImage
                button
                onClick={() => {
                  inputFileRef.current?.click();
                }}
              />
            )}
          </div>
        </div>
        <div className={style.field}>
          <label htmlFor="title">Title</label>

          <Input
            type="text"
            placeholder="Enter title here..."
            name="title"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              minLength: { value: 3, message: 'Min length 3' },
              maxLength: { value: 128, message: 'Max length 128' },
            }}
            error={errors.title?.message || Boolean(errors.title)}
          />
        </div>
        <Button type="submit" icon={<FolderPlusIcon />}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default BrandCreatePage;
