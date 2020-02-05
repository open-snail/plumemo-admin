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
      title: '社交账户',
      align: 'center',
      dataIndex: 'account'
    },
    {
      title: 'icon',
      align: 'center',
      dataIndex: 'icon',
      scopedSlots: { customRender: 'icon' }
    },
    {
      title: '二维码',
      dataIndex: 'qrCode',
      align: 'center',
      scopedSlots: { customRender: 'qrCode' }
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
      title: '跳转链接',
      align: 'center',
      dataIndex: 'url',
      scopedSlots: { customRender: 'url' }
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
      title: '是否启用',
      align: 'center',
      dataIndex: 'isEnabled',
      scopedSlots: { customRender: 'isEnabled' }
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
