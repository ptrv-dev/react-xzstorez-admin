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

interface Float {
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
  price: Float;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ProductResponse {
  data: ProductItem[];
}

export interface CouponItem {
  _id: string;
  name: string;
  coupon: string;
  percent: Float;
  uses: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CouponsResponse {
  data: CouponItem[];
}
