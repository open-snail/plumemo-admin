// 表格列信息
const table = {
  columns: [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '文章名称',
      align: 'center',
      dataIndex: 'title',
      scopedSlots: { customRender: 'titles' },
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createTime',
      scopedSlots: { customRender: 'createTime' },
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      align: 'center',
      scopedSlots: { customRender: 'summary' },
    },
    {
      title: '文章状态',
      dataIndex: 'status',
      align: 'center',
      scopedSlots: { customRender: 'status' },
    },
    {
      title: '同步状态',
      dataIndex: 'syncStatus',
      align: 'center',
      scopedSlots: { customRender: 'syncStatus' },
    },
    {
      title: '浏览数',
      align: 'center',
      dataIndex: 'views',
    },
    {
      title: '评论数',
      align: 'center',
      dataIndex: 'comments',
    },
    {
      title: '权重',
      align: 'center',
      dataIndex: 'weight',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      fixed: 'right',
      width: '250px',
      scopedSlots: { customRender: 'action' },
    },
  ],
};

// 表格里面的列key value
const filters = {
  syncStatusFilter(status: number) {
    enum StatusType {
      '未同步' = 0,
      '已同步' = 1,
    }
    return StatusType[status];
  },
  syncStatusTypeFilter(status: number) {
    enum StatusType {
      'error' = 0,
      'success' = 1,
    }
    return StatusType[status];
  },
  statusFilter(status: any) {
    enum StatusType {
      '草稿箱' = 1,
      '已发布' = 2,
    }
    return StatusType[status];
  },
  statusTypeFilter(status: any) {
    enum StatusType {
      'error' = 1,
      'success' = 2,
    }
    return StatusType[status];
  },
};

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
  htmlcode: true, // 展示html源码
};

export { table, filters, markdownOption };
