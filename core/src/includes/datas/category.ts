import { http } from '../functions';

// Types
import { CategoryApi } from 'types/datas/category';

export const categoryApi: CategoryApi = {
  /**
   * 获取分类列表
   */
  getList() {
    return http.getList('categories').then(({ models = [] }) => models);
  },

  /**
   * 获取分类数量
   */
  getCount() {
    return http.get('categories/count').then(({ model = 0 }) => model);
  },

  /**
   * 获取分类详情
   * @param id 标签 ID
   */
  get(id) {
    return http.get(`categories/${id}`).then(({ model }) => model);
  },
};
