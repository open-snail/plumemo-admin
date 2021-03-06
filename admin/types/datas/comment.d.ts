import { PagerResponse } from './request';

export type Comment = {
  id: number;
  name: string;
};

export type CreateCommentModel = {
  content: string;
  parentId: number;
};

export type CommentPagerResponse = PagerResponse<Comment>;

export type CommentPagerQuery = {
  page?: number;
  size?: number;
};

export type UpdateCommentModel = CreateCommentModel;

export interface CommentApi {
  getPageList(query?: CommentPagerQuery): Promise<CommentPagerResponse>;
  delete(id: number): Promise<true>;
  replyComment(data: any): Promise<void>;
}
