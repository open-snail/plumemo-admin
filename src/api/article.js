import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/posts/posts/v1/list',
    method: 'get',
    params: query
  })    
}

export function fetchByteBlogsList(query) {
  return request({
    url: '/posts/byte-blogs/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/posts/posts/v1/${id}`,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/posts/posts/v1/add',
    method: 'post',
    data
  })
}

export function crawlerArticle(data) {
  return request({
    url: '/posts/posts/v1/crawler',
    method: 'post',
    timeout: 500000,
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/posts/posts/v1/update',
    method: 'put',
    data
  })
}

export function updateArticleStatus(data) {
  return request({
    url: '/posts/status/v1/update',
    method: 'put',
    data
  })
}

export function deletePosts(id) {
  return request({
    url: `/posts/posts/v1/${id}`,
    method: 'delete'
  })
}

export function publishByteBlogs(data) {
  return request({
    url: '/posts/byte-blogs/v1/publish',
    method: 'post',
    data
  })
}
