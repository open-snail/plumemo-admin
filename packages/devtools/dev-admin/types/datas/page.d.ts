import { PagerQuery, PagerResponse } from './request';
import { PageStatus } from 'src/includes/datas/enums';

export type Page = {
  id: number;
  title: string;
  content: string;
  status: number;
  createTime: Date;
};

export type PageWithoutContent = Omit<Page, 'content'>;

export type CreatePageModel = {
  title: string;
  content: string;
};

export type UpdatePageModel = Partial<CreatePageModel>;

export type PagePagerQuery = PagerQuery<{
  keywords?: string;
  status?: PageStatus;
  createTime?: [string | Date | null, string | Date | null];
}>;

export type PagePagerResponse = PagerResponse<PageWithoutContent>;

export interface PageApi {
  getList(query?: PagePagerQuery): Promise<PagePagerResponse>;
  get(id: number): Promise<Page>;
  create(data: CreatePageModel): Promise<Page>;
  update(id: number, data: UpdatePageModel): Promise<true>;
  updateStatus(id: number, status: PageStatus): Promise<true>;
  delete(id: number): Promise<true>;
}
