import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import appAxios from '../../axios';

import LoadingPage from '../LoadingPage';
import FormImage from '../../components/FormImage';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import Button from '../../components/Button';

import DragIcon from '../../components/Icons/DragIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import DollarIcon from '../../components/Icons/DollarIcon';
import SaveIcon from '../../components/Icons/SaveIcon';

import style from '../ProductCreatePage/ProductCreatePage.module.scss';

import {
  BrandItem,
  BrandResponse,
  CategoryItem,
  CategoryResponse,
  ProductItem,
} from '../../@types/serverResponse';

interface ProductCreateFormFields {
  title: string;
  description?: string;
  category?: string;
  brand?: string;
  sizes?: string[];
  price: number;
}

const ProductEditPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductCreateFormFields>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductItem | undefined>();
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [brands, setBrands] = React.useState<BrandItem[]>([]);
  const [images, setImages] = React.useState<(string | File)[]>([]);
  const [sizes, setSizes] = React.useState(['']);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSizeAdd = () => setSizes((prev) => [...prev, '']);
  const handleRemoveSize = (idx: number) =>
    setSizes((prev) => prev.filter((_, i) => i !== idx));

  const fetchProduct = async () => {
    try {
      const { data } = await appAxios.get<ProductItem>(`/product/${id}`);
      setProduct(data);
      setImages(data.images.map((image) => '\\' + image));
      setSizes(data.sizes || []);
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('category', data.category?._id || undefined);
      setValue('brand', data.brand?._id || undefined);
      setValue('price', Number(data.price.$numberDecimal));
    } catch (error) {
      console.log(error);
      alert('Something going wrong...\nProduct fetch error');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await appAxios.get<CategoryResponse>('/category');
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't fetch categories");
    }
  };
  const fetchBrands = async () => {
    try {
      const { data } = await appAxios.get<BrandResponse>('/brand');
      setBrands(data.data);
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't fetch brands");
    }
  };

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    console.log(result);

    const temp = [...sizes];

    const [item] = temp.splice(result.source.index, 1);

    temp.splice(result.destination.index, 0, item);

    setSizes(temp);
  };

  const handleOnDragEndImage: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    console.log(result);

    const temp = [...images];

    const [item] = temp.splice(result.source.index, 1);

    temp.splice(result.destination.index, 0, item);

    setImages(temp);
  };

  const handleRemoveImage = (idx: number) => {
    window.confirm('Do you really want to delete the image?') &&
      setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  React.useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchProduct();
  }, [id]);

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

  const onSubmit: SubmitHandler<ProductCreateFormFields> = async (data) => {
    console.log(data);
    if (!images.length) return alert('Please select an image/images!');
    setLoading(true);

    for (const image of images) {
      const idx = images.indexOf(image);

      if (typeof image !== 'string') {
        const path = await imageUpload(image);
        images[idx] = '\\' + path;
      }
    }

    try {
      console.log(images);
      // return;
      const product = {
        images: images.map((image) => image.slice(1)),
        title: data.title,
        description: data.description,
        category: data.category === '0' ? '' : data.category,
        brand: data.brand === '0' ? '' : data.brand,
        sizes: sizes || [],
        price: data.price,
      };

      await appAxios.patch(`/product/${id}`, product);

      alert('The product has been successfully modified!');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't update a product");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log(event.target.files);
    for (const file of event.target.files) {
      setImages((prev) => [...prev, file]);
    }
  };

  const handleProductRemove = async () => {
    try {
      if (window.confirm('Do you really want to delete a product?')) {
        await appAxios.delete(`/product/${id}`);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert("Something going wrong...\nCan't remove product");
    }
  };

  if (!product) return <LoadingPage />;

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/png, image/jpeg, image/webp"
          multiple
          ref={fileInputRef}
          onChange={handleFile}
          hidden
        />
        <div className={style.field}>
          <label>Images</label>
          <DragDropContext onDragEnd={handleOnDragEndImage}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={style.row}
                >
                  {images.map((file, idx) => (
                    <Draggable
                      key={idx}
                      draggableId={idx.toString()}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <FormImage
                            href={file}
                            onRemove={() => {
                              handleRemoveImage(idx);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <FormImage
                    button
                    onClick={() => fileInputRef.current?.click()}
                  />
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
              maxLength: { value: 256, message: 'Max length 256' },
            }}
            error={errors.title?.message || Boolean(errors.title)}
          />
        </div>
        <div className={style.field}>
          <label htmlFor="description">Description</label>
          <TextArea
            placeholder="Enter description here..."
            rows={5}
            name="description"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              minLength: { value: 3, message: 'Min length 3' },
              maxLength: { value: 256, message: 'Max length 256' },
            }}
            error={errors.description?.message || Boolean(errors.description)}
          ></TextArea>
        </div>
        <div className={style.field}>
          <label htmlFor="category">Category</label>
          <Select name="category" register={register}>
            <option value={0}>—</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </Select>
        </div>
        <div className={style.field}>
          <label htmlFor="brand">Brand</label>
          <Select name="brand" register={register}>
            <option value={0}>—</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.title}
              </option>
            ))}
          </Select>
        </div>
        <div className={style.field}>
          <label>
            Sizes{' '}
            <button
              type="button"
              onClick={handleSizeAdd}
              className={style.buttonSmall}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.33331V12.6666"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.3335 8H12.6668"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </label>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="sizes">
              {(provided) => (
                <ul
                  className={style.list}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {sizes.map((size, idx) => (
                    <Draggable
                      key={idx}
                      draggableId={idx.toString()}
                      index={idx}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={style.item}
                        >
                          <DragIcon />
                          <Input
                            type="text"
                            value={size}
                            placeholder="Enter size here..."
                            onChange={(event) =>
                              setSizes((prev) => {
                                const temp = [...prev];
                                temp[idx] = event.target.value;
                                return temp;
                              })
                            }
                          />
                          <span
                            onClick={() => handleRemoveSize(idx)}
                            className={style.itemRemove}
                          >
                            <TrashIcon />
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={style.field}>
          <label htmlFor="price">Price</label>
          <Input
            type="text"
            placeholder="Enter price here..."
            icon={<DollarIcon />}
            name="price"
            register={register}
            validationSchema={{
              required: { value: true, message: 'Required' },
              pattern: {
                value: /(^\d+$)|(^\d+\.\d{1,2}$)/gm,
                message: 'Invalid price! Example 100 or 100.90',
              },
            }}
            error={errors.price?.message || Boolean(errors.price)}
          />
        </div>
        <div className={style.buttonsRow}>
          <Button type="submit" icon={<SaveIcon />} loading={loading}>
            Save
          </Button>
          <Button
            type="button"
            color="danger"
            icon={<TrashIcon />}
            onClick={handleProductRemove}
          >
            Delete
          </Button>
          <Button type="button" color="gray">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditPage;
