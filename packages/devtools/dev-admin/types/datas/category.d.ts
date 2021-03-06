export type Category = {
  id: number;
  name: string;
};

export type CreateCategoryModel = {
  name: string;
};

export type UpdateCategoryModel = CreateCategoryModel;

export interface CategoryApi {
  getList(): Promise<Category[]>;
  get(id: number): Promise<Category | null>;
  create(data: CreateCategoryModel): Promise<Category>;
  update(id: number, data: UpdateCategoryModel): Promise<true>;
  delete(id: number): Promise<true>;
}
