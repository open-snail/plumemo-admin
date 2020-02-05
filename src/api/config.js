import { axios } from '@/utils/request'

export function fetchConfigList (query) {
  return axios({
    url: '/config/config/v1/list',
    method: 'get',
    params: query
  })
}

export function updateConfig (data) {
  return axios({
    url: '/config/config/v1/update',
    method: 'put',
    data
  })
}
