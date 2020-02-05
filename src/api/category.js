import { axios } from '@/utils/request'

export function fetchCategoryLists (query) {
  return axios({
    url: '/category/category/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchCategoryList (query) {
  return axios({
    url: '/category/category-tags/v1/list',
    method: 'get',
    params: query
  })
}

export function createCategory (data) {
  return axios({
    url: '/category/category/v1/add',
    method: 'post',
    data
  })
}

export function fetchCategory (id) {
  return axios({
    url: `/category/category-tags/v1/${id}`,
    method: 'get'
  })
}

export function updateCategory (data) {
  return axios({
    url: '/category/category/v1/update',
    method: 'put',
    data
  })
}

export function deleteCategory (id) {
  return axios({
    url: `/category/category/v1/${id}`,
    method: 'delete'
  })
}
