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
      title: '父菜单ID',
      align: 'center',
      dataIndex: 'parentId'
    },
    {
      title: '菜单名称',
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: 'icon',
      dataIndex: 'icon',
      align: 'center'
    },
    {
      title: '跳转路径',
      align: 'center',
      dataIndex: 'url'
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
