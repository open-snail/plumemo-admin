import { axios } from '@/utils/request'

export function fetchBolgQuantityTotal (query) {
  return axios({
    url: '/dashboard/blog-total/v1/quantity',
    method: 'get',
    params: query
  })
}

export function fetchByteBlogsList (query) {
  return axios({
    url: '/dashboard/byte-blogs/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}

export function fetchByteBlogsChatList (query) {
  return axios({
    url: '/dashboard/byte-blogs-chat/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}

export function getPostsStatistics (query) {
  return axios({
    url: '/dashboard/post-statistics/v1/list',
    method: 'get',
    params: query
  })
}

export function getPostsRanking (query) {
  return axios({
    url: '/dashboard/post-ranking/v1/list',
    method: 'get',
    params: query
  })
}

export function getCountPerson (query) {
  return axios({
    url: '/byteblogs/user/v1/count',
    method: 'get',
    params: query
  })
}

export function getViewsChart (query) {
  return axios({
    url: '/byteblogs/user-views/v1/chart',
    method: 'get',
    params: query
  })
}
