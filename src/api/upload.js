import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: '/file/file/v1/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data
  })
}
