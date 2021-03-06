/**
 * 需要在 types 文件夹中引用
 */

export enum ArticleStatus {
  'draft' = 1,
  'published' = 2,
}

export enum PageStatus {
  'draft' = ArticleStatus.draft,
  'published' = ArticleStatus.published,
}
