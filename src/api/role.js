import { axios } from '@/utils/request'

export function getRoutes () {
  return axios({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles () {
  return axios({
    url: '/roles',
    method: 'get'
  })
}

export function addRole (data) {
  return axios({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole (id, data) {
  return axios({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole (id) {
  return axios({
    url: `/role/${id}`,
    method: 'delete'
  })
}
