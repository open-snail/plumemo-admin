import { type } from 'os';
import { PagerResponse } from './request';

export type Medias = {
  id: number;
  name: string;
  ip: string;
  fileName: string;
  originalFileName: string;
  suffixFileName: string;
  mimeType: string;
  mediaType: number;
  url: string;
  createdAt: string;
};

export type UpdateCategoryModel = {
  id: number;
  alt: string;
  description: string;
  title: string;
};

export type MediasPagerResponse = PagerResponse<Medias>;

export type MediasPagerQuery = {
  page?: number;
  size?: number;
};

export interface MediaApi {
  getPageList(query?: MediasPagerQuery): Promise<MediasPagerResponse>;
  get(id: number): Promise<Medias | null>;
  update(id: number, data: UpdateCategoryModel): Promise<true>;
  delete(id: number): Promise<true>;
  upload(data: any): Promise<string>;
}
