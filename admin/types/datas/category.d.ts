import { PagerResponse } from './request';

export type Category = {
  id: number;
  name: string;
  parentId: Number;
  description: string;
};

export type CreateCategoryModel = {
  name: string;
  parentId: Number;
  description: string;
};

export type UpdateCategoryModel = CreateCategoryModel;

export type CategoryPagerResponse = PagerResponse<Category>;

export type CategoryPagerQuery = {
  page?: number;
  size?: number;
};

export interface CategoryApi {
  getPageList(query?: CategoryPagerQuery): Promise<CategoryPagerResponse>;
  getList(): Promise<Category[]>;
  get(id: number): Promise<Category | null>;
  create(data: CreateCategoryModel): Promise<Category>;
  update(id: number, data: UpdateCategoryModel): Promise<true>;
  delete(id: number): Promise<true>;
}
