import { axios } from '@/utils/request'

export function fetchLogsList (query) {
  return axios({
    url: '/logs/logs/v1/list',
    method: 'get',
    params: query
  })
}

export function fetchLogs (id) {
  return axios({
    url: `/logs/logs/v1/${id}`,
    method: 'get'
  })
}

export function deleteLogs (id) {
  return axios({
    url: `/logs/logs/v1/${id}`,
    method: 'delete'
  })
}
