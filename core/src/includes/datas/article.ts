import { http } from '../functions';

// Types
import { ArticleWithoutContent, Article, ArticleApi } from 'types/datas/article';

/**
 * 格式化文章
 * @param article 原型
 * @param includeContent 是否包含 content
 */
function formatArticle(article: any): ArticleWithoutContent;
function formatArticle(article: any, includeContent: true): Article;
function formatArticle(article: any, includeContent = false) {
  const {
    id,
    status,
    author,
    title,
    summary,
    thumbnail,
    categoryId,
    categoryName,
    // comments,
    syncStatus,
    tagsList,
    views,
    weight,
    createTime,
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
      tags: tagsList,
      // comments,
      syncStatus,
      views,
      weight,
      createTime,
    },
    includeContent ? { content: article.content } : null,
  );
}

export const articleApi: ArticleApi = {
  /**
   * 获取文章列表
   * @param param
   */
  getList({ page = 1, size = 10, ...rest } = {}) {
    return http.getList('posts', { params: { page, size, ...rest } }).then(({ models, pageInfo }) => {
      return {
        rows: models.map((article) => formatArticle(article)),
        pager: pageInfo!,
      };
    });
  },

  /**
   * 获取文章数量
   */
  getCount() {
    return http.get('posts/count').then(({ model = 0 }) => model);
  },

  /**
   * 获取文章归档
   */
  getArchive() {
    return http.getList('posts/archives').then(({ models = [] }) =>
      models.map((item: any) => ({
        date: item.archiveDate,
        articles: item.archivePosts.map(formatArticle),
        total: item.archiveTotal,
      })),
    );
  },

  /**
   * 获取文章详情
   * @param id
   */
  get(id) {
    return http.get(`posts/${id}`).then(({ model }) => formatArticle(model, true));
  },
};
