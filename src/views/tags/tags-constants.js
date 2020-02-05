// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '标签名称',
      align: 'center',
      dataIndex: 'name'
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
