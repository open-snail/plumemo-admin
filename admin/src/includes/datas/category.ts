import { http } from '../functions';

// Types
import { Category, CategoryApi } from 'types/datas/category';

function formatCategory(users: any, includeContent = false): Category {
  const {
    // 主键
    id,
    // 用户名
    name,
  } = users;
  return Object.assign({
    // 主键
    id,
    // 用户名
    name,
  });
}

export const categoryApi: CategoryApi = {
  /**
   * 获取分类列表
   */
  getPageList({ page = 1, size = 10, ...rest } = {}) {
    return http.getList('admin/categories', { params: { page, size, ...rest } }).then(({ models, pageInfo }) => {
      return {
        rows: models,
        pager: pageInfo!,
      };
    });
  },

  getList() {
    return http.getList('admin/categories').then(({ models }) => {
      return models.map((tag) => formatCategory(tag));
    });
  },

  /**
   * 获取分类
   * @param id
   */
  get(id) {
    return http.get(`admin/terms/detail/${id}`).then(({ model }) => model);
  },

  /**
   * 新建分类
   * @param data
   */
  create(data) {
    return http.post('admin/categories', data).then(({ model }) => model);
  },

  /**
   * 修改分类
   * @param data
   */
  update(id, data) {
    return http.put(`admin/terms/categories/${id}`, data).then(() => true);
  },

  /**
   * 删除分类
   * @param id
   */
  delete(id) {
    return http.delete(`admin/terms/categories/${id}`).then(() => true);
  },
};
