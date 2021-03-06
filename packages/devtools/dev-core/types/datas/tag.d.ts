export type Tag = {
  id: number;
  name: string;
  articleTotal: number;
};

export interface TagApi {
  getList(): Promise<Tag[]>;
  getCount(): Promise<number>;
  get(id: number): Promise<Tag | null>;
}
