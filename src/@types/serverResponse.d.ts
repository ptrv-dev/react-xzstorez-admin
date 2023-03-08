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
