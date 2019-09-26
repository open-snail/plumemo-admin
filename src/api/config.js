import request from '@/utils/request'

export function fetchConfigList(query) {
  return request({
    url: '/config/config/v1/list',
    method: 'get',
    params: query
  })
}

export function updateConfig(data) {
  return request({
    url: '/config/config/v1/update',
    method: 'put',
    data
  })
}

