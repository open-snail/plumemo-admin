import { http } from '../functions';

// Types
import { Article, ArticleWithoutContent, ArticleApi } from 'types/datas/article';

/**
 * 格式化文章
 * @param article 原型
 * @param includeContent 是否包含 content
 */
function formatArticle(article: any): ArticleWithoutContent;
function formatArticle(article: any, includeContent: true): Article;
function formatArticle(article: any, includeContent = false): any {
  const {
    id,
    status,
    author,
    title,
    summary,
    thumbnail,
    categoryId,
    categoryName,
    tagsList,
    views,
    syncStatus,
    createTime,
    comments,
    weight,
  } = article;
  return Object.assign(
    {
      id,
      status,
      author,
      title,
      summary,
      thumbnail,
      category: { id: categoryId, name: categoryName },
      tagsList,
      views,
      syncStatus,
      createTime,
      comments,
      weight,
    },
    includeContent ? { content: article.content } : null,
  );
}

export const articleApi: ArticleApi = {
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
      .getList('admin/posts', { params: { page, size, createTime: _createTime, ...rest } })
      .then(({ models, pageInfo }) => {
        return {
          rows: models.map((article) => formatArticle(article)),
          pager: pageInfo!,
        };
      });
  },

  /**
   * 获取文章详情
   * @param id
   */
  get(id) {
    return http.get(`admin/posts/${id}`).then(({ model }) => formatArticle(model, true));
  },

  /**
   * 新建文章
   * @param article
   */
  create(data) {
    return http.post('admin/posts', data).then(({ model }) => formatArticle(model, true));
  },

  // crawler(article: any) {
  //   return http.post('/posts/postscrawler', article, {
  //     timeout: 500000,
  //   });
  // },

  /**
   * 修改文章
   * @param data
   */
  update(id, data) {
    return http.put(`admin/posts/${id}`, { id, ...data }).then(() => true);
  },

  /**
   *
   * @param data
   */
  updateStatus(id, status) {
    return http.put('admin/posts/status', { id, status }).then(() => true);
  },

  /**
   * 删除文章
   * @param id
   */
  delete(id) {
    return http.delete(`admin/posts/${id}`).then(() => true);
  },
  /**
   * 通过mysql迁移文章
   * @param data
   */
  importDataByDB(data) {
    return http.post(`admin/blog-move/mysql`, data, {
      timeout: 500000,
    });
  },

  publishByteBlogs(data) {
    return http.post(`posts/byte-blogs/v1/publish`, data);
  },
};
