// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '文件名',
      align: 'center',
      dataIndex: 'fileName'
    },
    {
      title: '原始文件名',
      align: 'center',
      dataIndex: 'originalFileName'
    },
    {
      title: '创建人',
      align: 'center',
      dataIndex: 'userName'
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createdAt',
      scopedSlots: { customRender: 'createdAt' }
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
const filters = {}
export { table, filters }
