import { http } from '../functions';

// Types
import { MediaApi } from 'types/datas/medias';

export const mediaApi: MediaApi = {
  /**
   * 获取分类列表
   */
  getPageList({ page = 1, size = 10, ...rest } = {}) {
    return http.getList('admin/medias/pages', { params: { page, size, ...rest } }).then(({ models, pageInfo }) => {
      return {
        rows: models,
        pager: pageInfo!,
      };
    });
  },
  /**
   * 获取分类
   * @param id
   */
  get(id) {
    return http.get(`admin/medias/${id}`).then(({ model }) => model);
  },

  /**
   * 修改分类
   * @param data
   */
  update(id, data) {
    return http.put(`admin/medias/${id}`, data).then(() => true);
  },

  /**
   * 删除分类
   * @param id
   */
  delete(id) {
    return http.delete(`admin/medias/${id}`).then(() => true);
  },

  /**
   * 删除分类
   * @param id
   */
  upload(data) {
    return http
      .post(`admin/file/upload/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(({ model }) => model);
  },
};
