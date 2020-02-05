import { axios } from '@/utils/request'

export function fetchMenuList (query) {
  return axios({
    url: '/menu/menu/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchMenu (id) {
  return axios({
    url: `/menu/menu/v1/${id}`,
    method: 'get'
  })
}

export function createMenu (data) {
  return axios({
    url: '/menu/menu/v1/add',
    method: 'post',
    data
  })
}

export function updateMenu (data) {
  return axios({
    url: '/menu/menu/v1/update',
    method: 'put',
    data
  })
}

export function deleteMenu (id) {
  return axios({
    url: `/menu/menu/v1/${id}`,
    method: 'delete'
  })
}
