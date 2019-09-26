import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/user/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/user/v1/get',
    method: 'get',
    headers: {
      'Authorization': token
    }
  })
}

export function updateUser(data) {
  return request({
    url: '/auth/admin/v1/update',
    method: 'put',
    data
  })
}

export function getUserList(query) {
  return request({
    url: '/auth/user/v1/list',
    method: 'get',
    params: query
  })
}

export function logout() {
  return request({
    url: '/auth/auth/v1/logout',
    method: 'post'
  })
}

export function getOauthLoginByGithub(params) {
  return request({
    url: '/auth/github/v1/get',
    method: 'get',
    params
  })
}

/**
 * 社交登录
 * @param request
 * @param params
 * @returns {*}
 */
export function socialLogin(data) {
  return request({
    url: '/auth/admin/v1/login',
    method: 'post',
    data
  })
}
