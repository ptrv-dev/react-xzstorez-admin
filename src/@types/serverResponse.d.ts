export interface BrandItem {
  _id: string;
  image: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface BrandResponse {
  data: BrandItem[];
}

export interface CategoryItem {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CategoryResponse {
  data: CategoryItem[];
}

interface Price {
  $numberDecimal: string;
}

export interface ProductItem {
  _id: string;
  images: string[];
  title: string;
  description?: string;
  category?: CategoryItem;
  brand?: BrandItem;
  sizes?: string[];
  price: Price;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponse {
  data: ProductItem[];
}
