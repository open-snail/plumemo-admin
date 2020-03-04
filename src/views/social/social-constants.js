// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: 'code',
      align: 'center',
      dataIndex: 'code'
    },
    {
      title: '社交内容',
      align: 'center',
      dataIndex: 'content',
      scopedSlots: { customRender: 'content' }
    },
    {
      title: '图标',
      align: 'center',
      dataIndex: 'icon',
      scopedSlots: { customRender: 'icon' }
    },
    {
      title: '展示类型',
      align: 'center',
      dataIndex: 'showType',
      scopedSlots: { customRender: 'showType' }
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      scopedSlots: { customRender: 'remark' }
    },
    {
      title: '启用',
      align: 'center',
      dataIndex: 'isEnabled',
      scopedSlots: { customRender: 'isEnabled' }
    },
    {
      title: '主页社交信息',
      align: 'center',
      dataIndex: 'isHome',
      scopedSlots: { customRender: 'isHome' }
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' }
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'updateTime',
      scopedSlots: { customRender: 'updateTime' }
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
      width: '250px',
      scopedSlots: { customRender: 'action' }
    }
  ]
}

// 表格里面的列key value
const filters = { }

export { table, filters }
