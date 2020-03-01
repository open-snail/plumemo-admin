import { axios } from '@/utils/request'

export function login (data) {
  return axios({
    url: '/auth/admin/v1/login',
    method: 'post',
    data
  })
}

export function updatePassword (data) {
  return axios({
    url: '/auth/password/v1/update',
    method: 'put',
    data
  })
}

export function getInfo (token) {
  return axios({
    url: '/auth/user/v1/get',
    method: 'get',
    headers: {
      'Authorization': token
    }
  })
}

export function updateStatus (data) {
  return axios({
    url: '/auth/status/v1/update',
    method: 'put',
    data
  })
}

export function updateUser (data) {
  return axios({
    url: '/auth/admin/v1/update',
    method: 'put',
    data
  })
}

export function getUserList (query) {
  return axios({
    url: '/auth/user/v1/list',
    method: 'get',
    params: query
  })
}

export function logout () {
  return axios({
    url: '/auth/auth/v1/logout',
    method: 'post'
  })
}

export function getOauthLoginByGithub (params) {
  return axios({
    url: '/auth/github/v1/get',
    method: 'get',
    params
  })
}

export function deleteUser (id) {
  return axios({
    url: `/auth/user/v1/${id}`,
    method: 'delete'
  })
}

export function socialLogin (data) {
  return axios({
    url: '/auth/admin/v1/login',
    method: 'post',
    data
  })
}
