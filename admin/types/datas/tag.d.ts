import { PagerResponse } from './request';

export type Tag = {
  id: number;
  name: string;
};

export type CreateTagModel = {
  name: string;
};

export type TagsPagerResponse = PagerResponse<Tag>;

export type TagsPagerQuery = {
  page?: number;
  size?: number;
};

export type UpdateTagModel = CreateTagModel;

export interface TagApi {
  getPageList(query?: TagsPagerQuery): Promise<TagsPagerResponse>;
  getList(): Promise<Tag[]>;
  get(id: number): Promise<Tag | null>;
  create(data: CreateTagModel): Promise<Tag>;
  update(id: number, data: UpdateTagModel): Promise<true>;
  delete(id: number): Promise<true>;
}
