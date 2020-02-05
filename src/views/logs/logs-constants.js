// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id'
    },
    {
      title: '用户ID',
      align: 'center',
      dataIndex: 'userId'
    },
    {
      title: '日志类型',
      align: 'center',
      dataIndex: 'codeName'
    },
    {
      title: 'ip地址',
      align: 'center',
      dataIndex: 'ip'
    },
    {
      title: '请求URL',
      align: 'center',
      dataIndex: 'url',
      scopedSlots: { customRender: 'url' }
    },
    {
      title: '请求参数',
      align: 'center',
      dataIndex: 'parameter',
      scopedSlots: { customRender: 'parameter' }
    },
    {
      title: '设备',
      align: 'center',
      dataIndex: 'device'
    },
    {
      title: '执行时间',
      align: 'center',
      dataIndex: 'runTime'
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' }
    },
    {
      title: '浏览器名称',
      align: 'center',
      dataIndex: 'browserName'
    },
    {
      title: '浏览器版本号',
      align: 'center',
      dataIndex: 'browserVersion'
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
const filters = {
  syncStatusFilter (status) {
    const statusMap = {
      0: '未同步',
      1: '已同步'
    }
    return statusMap[status]
  },
  syncStatusTypeFilter (status) {
    const statusMap = {
      0: 'error',
      1: 'success'
    }
    return statusMap[status]
  },
  statusFilter (status) {
    const statusMap = {
      1: '草稿箱',
      2: '已发布'
    }
    return statusMap[status]
  },
  statusTypeFilter (status) {
    const statusMap = {
      1: 'error',
      2: 'success'
    }
    return statusMap[status]
  }
}

// md配置
const markdownOption = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: false, // 中划线
  mark: true, // 标记
  superscript: false, // 上角标
  subscript: false, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: false, // 全屏编辑
  readmodel: false, // 沉浸式阅读
  help: true, // 帮助
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  save: true, // 保存（触发events中的save事件）
  navigation: true, // 导航目录
  subfield: true, // 单双栏模式
  preview: true, // 预览
  htmlcode: true// 展示html源码
}

export { table, filters, markdownOption }
