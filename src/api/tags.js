import { axios } from '@/utils/request'

export function fetchTagsList (query) {
  return axios({
    url: '/tags/tags/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchTags (id) {
  return axios({
    url: `/tags/tags/v1/${id}`,
    method: 'get'
  })
}

export function createTags (data) {
  return axios({
    url: '/tags/tags/v1/add',
    method: 'post',
    data
  })
}

export function updateTags (data) {
  return axios({
    url: '/tags/tags/v1/update',
    method: 'put',
    data
  })
}

export function deleteTags (id) {
  return axios({
    url: `/tags/tags/v1/${id}`,
    method: 'delete'
  })
}
