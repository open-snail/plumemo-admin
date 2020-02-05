// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '分类名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '标签名称',
      align: 'center',
      dataIndex: 'tagsList',
      scopedSlots: { customRender: 'tagsList' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]
}

// 表格里面的列key value
const filters = {
  syncStatusTypeFilter (status) {
    const statusMap = {
      0: 'error',
      1: 'success'
    }
    return statusMap[status]
  },
  statusTypeFilter (status) {
    const statusMap = {
      1: 'error',
      2: 'success'
    }
    return statusMap[status]
  },
  tagsListFilter (tagsList) {
    return '这是一个测试'
  }
}
export { table, filters }
