import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BrandItem } from '../../@types/serverResponse';
import appAxios from '../../axios';
import Button from '../../components/Button';
import FormImage from '../../components/FormImage';
import SaveIcon from '../../components/Icons/SaveIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import Input from '../../components/Input';

import style from '../BrandCreatePage/BrandCreatePage.module.scss';
import LoadingPage from '../LoadingPage';

interface FormFields {
  title: string;
}

const BrandEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const [image, setImage] = React.useState<File | string>();
  const [brand, setBrand] = React.useState<BrandItem>();

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
  };

  const fetchBrand = async () => {
    try {
      const { data } = await appAxios.get<BrandItem>(`/brand/${id}`);
      setBrand(data);
      setValue('title', data.title);
      setImage('\\' + data.image);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't fetch brand");
    }
  };

  React.useEffect(() => {
    fetchBrand();
  }, [id]);

  const handleImageRemove = () => {
    window.confirm('Do you really want to delete an image?') &&
      setImage(undefined);
  };

  const imageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await appAxios.post('/upload', formData);

      return data.path as string;
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't upload image");
    }
    return '';
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!image) return alert('Please select an image!');
    try {
      let imageUrl = image;

      if (typeof image !== 'string') {
        imageUrl = await imageUpload(image);
      }

      const brand = {
        image: /^\\{1,2}/.test(imageUrl as string)
          ? imageUrl.slice(1)
          : imageUrl,
        title: data.title,
      };

      console.log(brand);

      await appAxios.patch(`/brand/${id}`, brand);

      alert('Brand successfully edited!');

      navigate('/brands');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't edit brand");
    }
  };

  const handleCancel = () => navigate('/brands');
  const handleRemove = async () => {
    try {
      if (window.confirm('Do you really want to delete a brand?')) {
        await appAxios.delete(`/brand/${id}`);
        alert('Brand successfully deleted!');
        navigate('/brands');
      }
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't delete brand");
    }
  };

  if (!brand) return <LoadingPage />;

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Button type="submit" icon={<SaveIcon />}>
            Save
          </Button>
          <Button
            type="button"
            color="danger"
            icon={<TrashIcon />}
            onClick={handleRemove}
          >
            Delete
          </Button>
          <Button type="button" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandEditPage;
