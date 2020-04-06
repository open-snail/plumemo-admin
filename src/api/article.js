import { axios } from '@/utils/request'

export function fetchList (query) {
  return axios({
    url: '/posts/posts/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchByteBlogsList (query) {
  return axios({
    url: '/posts/byte-blogs/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle (id) {
  return axios({
    url: `/posts/posts/v1/${id}`,
    method: 'get'
  })
}

export function createArticle (data) {
  return axios({
    url: '/posts/posts/v1/add',
    method: 'post',
    data
  })
}

export function crawlerArticle (data) {
  return axios({
    url: '/posts/posts/v1/crawler',
    method: 'post',
    timeout: 500000,
    data
  })
}

export function updateArticle (data) {
  return axios({
    url: '/posts/posts/v1/update',
    method: 'put',
    data
  })
}

export function updateArticleStatus (data) {
  return axios({
    url: '/posts/status/v1/update',
    method: 'put',
    data
  })
}

export function deletePosts (id) {
  return axios({
    url: `/posts/posts/v1/${id}`,
    method: 'delete'
  })
}

export function publishByteBlogs (data) {
  return axios({
    url: '/posts/byte-blogs/v1/publish',
    method: 'post',
    data
  })
}

export function importDataByDB (data) {
  return axios({
    url: '/blog-move/v1/mysql',
    method: 'post',
    timeout: 5000000,
    data
  })
}
