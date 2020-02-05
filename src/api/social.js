import { axios } from '@/utils/request'

export function fetchSocialList (query) {
  return axios({
    url: '/auth/social/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchSocial (id) {
  return axios({
    url: `/auth/social/v1/${id}`,
    method: 'get'
  })
}

export function createSocial (data) {
  return axios({
    url: '/auth/social/v1/add',
    method: 'post',
    data
  })
}

export function updateSocial (data) {
  return axios({
    url: '/auth/social/v1/update',
    method: 'put',
    data
  })
}

export function deleteSocial (id) {
  return axios({
    url: `/auth/social/v1/${id}`,
    method: 'delete'
  })
}
