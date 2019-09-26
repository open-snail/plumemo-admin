import request from '@/utils/request'

export function fetchLinkList(query) {
  return request({
    url: '/link/link/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchLink(id) {
  return request({
    url: `/link/link/v1/${id}`,
    method: 'get'
  })
}

export function createLink(data) {
  return request({
    url: '/link/link/v1/add',
    method: 'post',
    data
  })
}

export function updateLink(data) {
  return request({
    url: '/link/link/v1/update',
    method: 'put',
    data
  })
}

export function deleteLink(id) {
  return request({
    url: `/link/link/v1/${id}`,
    method: 'delete'
  })
}
