import { PagerQuery, PagerResponse } from './request';
import { Tag } from './tag';
import { Category } from './category';
import { ArticleStatus } from 'src/includes/datas/enums';

export type Article = {
  id: number;
  title: string;
  summary: string;
  author: string;
  content: string;
  thumbnail: string;
  category: Category;
  status: number;
  tags: Tag[];
  views: number;
  createTime: Date;
};

export type ArticleWithoutContent = Omit<Article, 'content'>;

export type CreateArticleModel = {
  title: string;
  summary?: string;
  content: string;
  thumbnail: string;
  categoryId: Category['id'];
  tags: Tag['name'][];
};

export type UpdateArticleModel = Partial<CreateArticleModel>;

export type ArticlePagerQuery = PagerQuery<{
  keywords?: string;
  status?: ArticleStatus;
  createTime?: [string | Date | null, string | Date | null];
}>;

export type ArticlePagerResponse = PagerResponse<ArticleWithoutContent>;

export type ArticleArchive = {
  date: Date;
  articles: Array<ArticleWithoutContent>;
  total: number;
};

export interface ArticleApi {
  getList(query?: ArticlePagerQuery): Promise<ArticlePagerResponse>;
  get(id: number): Promise<Article>;
  create(data: CreateArticleModel): Promise<Article>;
  update(id: number, data: UpdateArticleModel): Promise<true>;
  updateStatus(id: number, status: ArticleStatus): Promise<true>;
  delete(id: number): Promise<true>;
}
