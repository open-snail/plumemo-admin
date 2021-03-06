import { http } from '../functions';

// Types
import { Tag, TagApi } from 'types/datas/tag';

function formatTag(tag: any): Tag {
  const { id, name, postsTotal } = tag;
  return {
    id,
    name,
    articleTotal: postsTotal,
  };
}

export const tagApi: TagApi = {
  /**
   * 获取标签列表
   */
  getList() {
    return http.getList('tags').then(({ models = [] }) => models.map(formatTag));
  },

  /**
   * 获取标签数量
   */
  getCount() {
    return http.get('tags/count').then(({ model = 0 }) => model);
  },

  /**
   * 获取标签详情
   * @param id 标签 ID
   */
  get(id: number) {
    return http.get(`tags/${id}`).then(({ model }) => formatTag(model));
  },
};
