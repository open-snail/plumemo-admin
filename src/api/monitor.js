import { axios } from '@/utils/request'

export function getSystem (query) {
  return axios({
    url: '/monitor/system/v1/get',
    method: 'get',
    params: query
  })
}

export function getMemory (query) {
  return axios({
    url: '/monitor/memory/v1/get',
    method: 'get',
    params: query
  })
}
