import request from '@/utils/request'

export function fetchBolgQuantityTotal(query) {
  return request({
    url: '/dashboard/blog-total/v1/quantity',
    method: 'get',
    params: query
  })
}

export function fetchByteBlogsList(query) {
  return request({
    url: '/dashboard/byte-blogs/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}

export function fetchByteBlogsChatList(query) {
  return request({
    url: '/dashboard/byte-blogs-chat/v1/list',
    method: 'get',
    timeout: 500000,
    params: query
  })
}
