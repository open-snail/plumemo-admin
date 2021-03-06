import upperFirst from 'lodash.upperfirst';
import { PageStatus } from '@/includes/datas/enums';

// 表格列信息
const table = () => ({
  columns: [
    // {
    //   title: 'ID',
    //   align: 'center',
    //   dataIndex: 'id',
    // },
    {
      title: (i18nRender: (key: string, fallback: string) => string) => i18nRender('article.column.title', 'Title'),
      align: 'left',
      dataIndex: 'title',
      scopedSlots: { customRender: 'titles' },
    },
    {
      title: (i18nRender: (key: string, fallback: string) => string) => i18nRender('article.column.status', 'Status'),
      dataIndex: 'status',
      align: 'left',
      scopedSlots: { customRender: 'status' },
    },
    {
      title: (i18nRender: (key: string, fallback: string) => string) =>
        i18nRender('article.column.createTime', 'CreateTime'),
      align: 'left',
      dataIndex: 'createTime',
      width: '250px',
      scopedSlots: { customRender: 'createTime' },
    },
    {
      title: (i18nRender: (key: string, fallback: string) => string) => i18nRender('article.column.actions', 'Actions'),
      dataIndex: 'actions',
      align: 'left',
      fixed: 'right',
      width: '250px',
      scopedSlots: { customRender: 'actions' },
    },
  ],
});

// 表格里面的列key value
const filters = {
  statusFilter(status: PageStatus, i18nRender: (key: string, fallback: string) => string) {
    return i18nRender(`page.status.${PageStatus[status]}`, upperFirst(PageStatus[status]));
  },
  statusTypeFilter(status: number) {
    enum StatusType {
      'error' = PageStatus.draft,
      'success' = PageStatus.published,
    }
    return StatusType[status];
  },
};

// md配置
const markdownOption = () => ({
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
});

export { table, filters, markdownOption };
