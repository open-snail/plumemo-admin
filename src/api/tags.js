import request from '@/utils/request'

export function fetchTagsList(query) {
  return request({
    url: '/tags/tags/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchTags(id) {
  return request({
    url: `/tags/tags/v1/${id}`,
    method: 'get'
  })
}

export function createTags(data) {
  return request({
    url: '/tags/tags/v1/add',
    method: 'post',
    data
  })
}

export function updateTags(data) {
  return request({
    url: '/tags/tags/v1/update',
    method: 'put',
    data
  })
}

export function deleteTags(id) {
  return request({
    url: `/tags/tags/v1/${id}`,
    method: 'delete'
  })
}
