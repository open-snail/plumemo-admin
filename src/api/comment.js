import { axios } from '@/utils/request'

export function fetchCommentLists (query) {
  return axios({
    url: '/comments/comments/v1/get',
    method: 'get',
    params: query
  })
}

export function fetchCommentList (query) {
  return axios({
    url: '/comments/comments/v1/list',
    method: 'get',
    params: query
  })
}

export function replyComment (data) {
  return axios({
    url: '/comments/admin/v1/reply',
    method: 'post',
    data
  })
}

export function fetchComment (id) {
  return axios({
    url: `/comments/comments/v1/${id}`,
    method: 'get'
  })
}

export function updateComment (data) {
  return axios({
    url: '/comments/comments/v1/update',
    method: 'put',
    data
  })
}

export function deleteComment (id) {
  return axios({
    url: `/comments/comments/v1/${id}`,
    method: 'delete'
  })
}
