export type Category = {
  id: number;
  name: string;
};

export interface CategoryApi {
  getList(): Promise<Category[]>;
  getCount(): Promise<number>;
  get(id: number): Promise<Category | null>;
}
