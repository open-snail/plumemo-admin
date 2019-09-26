import request from '@/utils/request'

export function fetchCategoryList(query) {
  return request({
    url: '/category/category-tags/v1/list',
    method: 'get',
    params: query
  })
}

export function createCategory(data) {
  return request({
    url: '/category/category/v1/add',
    method: 'post',
    data
  })
}

export function fetchCategory(id) {
  return request({
    url: `/category/category-tags/v1/${id}`,
    method: 'get'
  })
}

export function updateCategory(data) {
  return request({
    url: '/category/category/v1/update',
    method: 'put',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: `/category/category/v1/${id}`,
    method: 'delete'
  })
}
