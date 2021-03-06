/**
 * 中文
 */
// @ts-ignore
import antd from 'ant-design-vue/es/locale-provider/zh_CN';
// @ts-ignore
import momentCN from 'moment/locale/zh-cn';

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN,

  // 内部组件
  sTable: {
    sum: '总计',
    selected: '已选择',
    clear: '清除',
  },
  avatarDropdown: {
    user: {
      center: '个人中心',
      settings: '用户设置',
      logout: '退出登录',
    },
    dialog: {
      logout: {
        title: '@:common.dialog.title.tip',
        content: '确认退出吗？',
      },
    },
  },
};

const locale = {
  // 菜单
  menu: {
    dashboard: '仪表盘',
    article: {
      root: '文章',
      articles: '所有文章',
      create: '新建文章',
      tags: '标签管理',
      categories: '分类管理',
    },
    media: {
      root: '媒体',
      medias: '媒体库',
      create: '新建媒体',
    },
    page: {
      root: '页面',
      pages: '所有页面',
      create: '新建页面',
    },
    theme: {
      root: '主题',
      libs: '主题库',
      customize: '自定义',
      color: '主题色配置',
      widgets: '小组件',
    },
    plugin: {
      root: '插件',
      plugins: '插件库',
      installed: '已安装插件',
    },
    tools: {
      root: '工具',
      import: '导入',
      export: '导出',
    },
    settings: {
      root: '设置',
      general: '常规',
    },
  },

  // 面包屑导航
  breadcrumb: {
    dashboard: '@:menu.dashboard',
    articles: '@:menu.article.root',
    allArticles: '@:menu.article.articles',
    tags: '标签',
    categories: '分类',
    pages: '@:menu.page.root',
    allPages: '@:menu.page.pages',
    medias: '@:menu.media.root',
    allMedias: '@:menu.media.medias',
    themes: '@:menu.theme.root',
    themeLibs: '@:menu.theme.libs',
    themeCustomize: '@:menu.theme.libs',
    themeColor: '@:menu.theme.color',
    widgets: '@:menu.theme.widgets',
    tools: '@:menu.tools.root',
    import: '@:menu.tools.import',
    export: '@:menu.tools.export',
    generalSettings: '@:menu.settings.general设置',

    new: '新建',
    create: '@:breadcrumb.new',
    edit: '编辑',
  },

  // 文章
  article: {
    status: {
      all: '全部', // 仅用于搜索
      draft: '草稿',
      published: '已发布',
    },
    search: {
      title: '标题',
      titlePlaceholder: '请输入@:article.search.title',
      status: '文章状态',
      statusPlaceholder: '请选择@.lower:article.search.status',
    },
    column: {
      title: '标题',
      author: '作者',
      summary: '摘要',
      status: '文章状态',
      views: '浏览数',
      createTime: '创建时间',
      actions: '操作',
    },
    dialog: {
      delete: {
        content: '确定删除这篇文章？',
        okBtn: '@:common.btnText.ok',
        cancelBtn: '@:common.btnText.no',
      },
    },
    form: {
      title: '文章标题',
      titlePlaceholder: '请输入@:article.form.title',
      author: '作者',
      authorPlaceholder: '请输入@:article.form.author',
      summary: '文章描述',
      summaryPlaceholder: '请输入@:article.form.summary',
      thumbnail: '封面图',
      tag: '标签',
      tagPlaceholder: '请选择@:article.form.tag',
      category: '分类',
      categoryPlaceholder: '请选择@:article.form.category',
      content: '文章内容',
      contentPlaceholder: '编辑@:article.form.content',
    },
    btnText: {
      edit: '@:common.btnText.edit',
      update: '@:common.btnText.update',
      save: '@:common.btnText.save',
      delete: '@:common.btnText.delete',
      reset: '@:common.btnText.reset',
      back: '@:common.btnText.back',
      publish: '发布',
      upload: '点击上传',
      moveToDraft: '放入草稿箱',
      saveToDraft: '保存到草稿箱',
    },
    btnTips: {
      edit: '@:article.btnText.edit',
      update: '@:article.btnText.update',
      save: '保存文章并发布',
      delete: '@:article.btnText.delete',
      reset: '@:article.btnText.reset',
      back: '@:article.btnText.back',
      publish: '@:article.btnText.publish',
      moveToDraft: '@:article.btnText.moveToDraft',
      saveToDraft: '保存文章到草稿箱',
    },
  },

  // 常规
  common: {
    dialog: {
      title: {
        tip: '提示',
        comfirm: '确认',
      },
      btn: {
        ok: '@:common.btnText.ok',
        no: '@:common.btnText.no',
        cancel: '@:common.btnText.cancel',
        confirm: '@:common.btnText.confirm',
      },
    },
    placeholder: {
      input: 'Input {field}',
      choose: 'Choose {field}',
    },
    btnText: {
      ok: '是',
      no: '否',
      cancel: '取消',
      confirm: '确认',
      create: '新建',
      edit: '编辑',
      update: '修改',
      save: '保存',
      delete: '删除',
      search: '搜索',
      reset: '重置',
      expand: '展开',
      collapse: '收起',
      upload: '上传',
      back: '返回',
    },
  },

  // 错误消息
  error: {
    404: '页面未找到',
    500: '系统错误，请稍后重试',

    // plugins error
    modulesLoadError: '模块加载失败',
  },
};

export default {
  name: '简体中文',
  ...components,
  ...locale,
};
