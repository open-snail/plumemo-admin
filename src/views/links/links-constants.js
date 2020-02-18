// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '排序',
      align: 'center',
      dataIndex: 'sort'
    },
    {
      title: '友链名称',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '友链标题',
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: 'logo',
      dataIndex: 'logo',
      align: 'center',
      scopedSlots: { customRender: 'logo' }
    },
    {
      title: '友链地址',
      align: 'center',
      dataIndex: 'href'
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
