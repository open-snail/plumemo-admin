import { axios } from '@/utils/request'

export function fetchLinkList (query) {
  return axios({
    url: '/link/link/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchLink (id) {
  return axios({
    url: `/link/link/v1/${id}`,
    method: 'get'
  })
}

export function createLink (data) {
  return axios({
    url: '/link/link/v1/add',
    method: 'post',
    data
  })
}

export function updateLink (data) {
  return axios({
    url: '/link/link/v1/update',
    method: 'put',
    data
  })
}

export function deleteLink (id) {
  return axios({
    url: `/link/link/v1/${id}`,
    method: 'delete'
  })
}
