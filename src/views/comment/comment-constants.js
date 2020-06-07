// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '作者',
      align: 'center',
      dataIndex: 'authorName'
    },
    {
      title: '回复对象',
      align: 'center',
      dataIndex: 'parentUserName',
      scopedSlots: { customRender: 'parentUserName' }
    },
    {
      title: '文章标题',
      align: 'center',
      dataIndex: 'title',
      scopedSlots: { customRender: 'postTitle' }
    },
    {
      title: '评论内容',
      align: 'center',
      dataIndex: 'content',
      scopedSlots: { customRender: 'content' }
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
