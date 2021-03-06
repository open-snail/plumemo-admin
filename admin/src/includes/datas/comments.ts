import { http } from '../functions';

// Types
import { CommentApi } from 'types/datas/comment';

export const commentApi: CommentApi = {
  getPageList({ page = 1, size = 10, ...rest } = {}) {
    return http.getList('admin/comments/pages', { params: { page, size, ...rest } }).then(({ models, pageInfo }) => {
      return {
        rows: models,
        pager: pageInfo!,
      };
    });
  },
  delete(id) {
    return http.delete(`admin/comments/${id}`).then(() => true);
  },
  replyComment(data) {
    return http.post(`admin/comments/reply`, data);
  },
};
