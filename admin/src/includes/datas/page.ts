import { http } from '../functions';

// Types
import { Page, PageWithoutContent, PageApi } from 'types/datas/page';

/**
 * 格式化文章
 * @param page 原型
 * @param includeContent 是否包含 content
 */
function formatPage(page: any): PageWithoutContent;
function formatPage(page: any, includeContent: true): Page;
function formatPage(page: any, includeContent = false): any {
  const { id, status, title, createTime } = page;
  return Object.assign(
    {
      id,
      status,
      title,
      createTime,
    },
    includeContent ? { content: page.content } : null,
  );
}

export const pageApi: PageApi = {
  /**
   * 获取文章列表
   * @param param
   */
  getList({ page = 1, size = 10, createTime, ...rest } = {}) {
    let _createTime = null;
    if (createTime && (createTime[0] || createTime[1])) {
      _createTime = `${createTime[0] || ''}-${createTime[1] || ''}`;
    }

    return http
      .getList('admin/pages', { params: { page, size, createTime: _createTime, ...rest } })
      .then(({ models, pageInfo }) => {
        return {
          rows: models.map((page) => formatPage(page)),
          pager: pageInfo!,
        };
      });
  },

  /**
   * 获取文章详情
   * @param id
   */
  get(id) {
    return http.get(`admin/pages/${id}`).then(({ model }) => formatPage(model, true));
  },

  /**
   * 新建文章
   * @param page
   */
  create(data) {
    return http.post('admin/pages', data).then(({ model }) => formatPage(model, true));
  },

  // crawler(page: any) {
  //   return http.post('/pages/pagescrawler', page, {
  //     timeout: 500000,
  //   });
  // },

  /**
   * 修改文章
   * @param data
   */
  update(id, data) {
    return http.put(`admin/pages/${id}`, { id, ...data }).then(() => true);
  },

  /**
   *
   * @param data
   */
  updateStatus(id, status) {
    return http.put('admin/pages/status', { id, status }).then(() => true);
  },

  /**
   * 删除文章
   * @param id
   */
  delete(id) {
    return http.delete(`admin/pages/${id}`).then(() => true);
  },
};
