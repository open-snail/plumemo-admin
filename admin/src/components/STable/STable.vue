<script>
import T from 'ant-design-vue/es/table/Table';
import get from 'lodash.get';

export default {
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key',
    },
    data: {
      type: Function,
      required: true,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    showSizeChanger: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'default',
    },
    /**
     * alert: {
     *   show: true,
     *   clear: Function | true
     * } | true
     */
    alert: {
      type: [Object, Boolean],
      default: null,
    },
    rowSelection: {
      type: Object,
      default: null,
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto',
    },
    /**
     * enable page URI mode
     *
     * e.g:
     * /users/1
     * /users/2
     * /users/3?queryParam=test
     * /users?[pageNoKey]=1
     * ...
     */
    pageURI: {
      type: Boolean,
      default: false,
    },
    pageNoKey: {
      type: String,
      default: 'page',
    },
  }),
  data() {
    return {
      needTotalList: [],
      selectedRows: [],
      selectedRowKeys: [],
      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination),
    };
  },
  computed: {
    showAlert() {
      if (this.alert === null) return false;

      return (
        (typeof this.alert === 'object' &&
          this.alert.show &&
          this.rowSelection &&
          typeof this.rowSelection.selectedRowKeys !== 'undefined') ||
        this.alert
      );
    },
    hasPagination() {
      return ['auto', true].includes(this.showPagination);
    },
  },
  watch: {
    'localPagination.current'(val) {
      this.$router &&
        this.pageURI &&
        this.$router.push({
          ...this.$route,
          name: this.$route.name,
          params: Object.assign({}, this.$route.params, {
            pageNo: val,
          }),
        });
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val,
      });
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val,
      });
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val,
      });
    },
  },
  created() {
    // 处理分页显示
    let localPageNum = this.pageNum;
    // page num from URI
    if (this.$router && this.pageURI) {
      try {
        if (this.$route.params[this.pageNoKey]) {
          localPageNum = parseInt(this.$route.params[this.pageNoKey]);
        } else if (this.$route.query[this.pageNoKey]) {
          localPageNum = parseInt(this.$route.query[this.pageNoKey]);
        }
      } catch (err) {
        // ate by dog
      }
    }
    this.localPagination =
      (this.hasPagination &&
        Object.assign({}, this.localPagination, {
          current: localPageNum,
          pageSize: this.pageSize,
          hideOnSinglePage: this.showPagination === 'auto',
          showSizeChanger: this.showSizeChanger,
        })) ||
      false;

    this.needTotalList = this.initTotalList(this.columns);
    this.loadData();
  },
  methods: {
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      this.localLoading = true;
      const parameter = Object.assign(
        {
          page:
            (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
          size:
            (pagination && pagination.pageSize) ||
            (this.showPagination && this.localPagination.pageSize) ||
            this.pageSize,
        },
        (sorter && sorter.field && { sortField: sorter.field }) || {},
        (sorter && sorter.order && { sortOrder: sorter.order }) || {},
        { ...filters },
      );
      const result = this.data(parameter);
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then((r) => {
          this.localPagination =
            this.localPagination &&
            Object.assign({}, this.localPagination, {
              current: r.pager.page, // 返回结果中的当前分页数
              total: r.pager.total, // 返回结果中的总记录数
              pageSize: r.pager.size,
            });
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.rows.length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--;
            this.loadData();
            return;
          }

          this.localDataSource = r.rows; // 返回结果中的数组数据
          this.localLoading = false;
        });
      }
    },
    initTotalList(columns) {
      const totalList = [];
      Array.isArray(columns) &&
        columns.length &&
        columns.forEach((column) => {
          if (column.needTotal) {
            totalList.push({ ...column, total: 0 });
          }
        });
      return totalList;
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(force = false) {
      force && (this.localPagination = Object.assign({}, { current: 1, pageSize: this.size }));
      this.loadData();
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
      const list = this.needTotalList;
      this.needTotalList = list.map((item) => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(get(val, item.dataIndex));
            return isNaN(total) ? 0 : total;
          }, 0),
        };
      });
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.rowSelection) {
        this.rowSelection.onChange && this.rowSelection.onChange([], []);
        this.updateSelect([], []);
      }
    },

    renderAlert() {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item) => {
        return (
          <span style="margin-right: 12px">
            {typeof item.title === 'function' ? item.title(this.$tv.bind(this)) : item.title}
            {this.$tv('sTable.sum', ' Sum')}:&nbsp;
            <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
          </span>
        );
      });

      // 绘制 清空 按钮
      let clearItem = null;
      if (this.alert && this.alert.clear) {
        const callback = typeof this.alert.clear === 'function' ? this.alert.clear : () => {};
        clearItem = renderClear.call(this, callback);
      }

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px;">
          <template slot="message">
            <span style="margin-right: 12px">
              {this.$tv('sTable.selected', 'Selected')}:&nbsp;<a style="font-weight: 600">{this.selectedRows.length}</a>
            </span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      );

      // 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
      function renderClear(callback) {
        if (this.selectedRowKeys.length <= 0) return null;
        return (
          <a
            style="margin-left: 24px"
            onClick={() => {
              callback();
              this.clearSelected();
            }}
          >
            {this.$tv('sTable.clear', 'Clear')}
          </a>
        );
      }
    },
  },

  render() {
    const props = {};
    const localKeys = Object.keys(this.$data);

    Object.keys(T.props).forEach((k) => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`;
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey];
        return props[k];
      }
      if (k === 'columns') {
        props[k] = this[k].map(({ title, ...rest }) => ({
          title: typeof title === 'function' ? title(this.$tv.bind(this)) : title,
          ...rest,
        }));
        return props[k];
      } else if (k === 'rowSelection') {
        if (this.showAlert && this.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows);
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows);
            },
          };
          return props[k];
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null;
          return props[k];
        }
      }
      this[k] && (props[k] = this[k]);
      return props[k];
    });
    const table = <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}></a-table>;

    return (
      <div class="table-wrapper">
        {this.showAlert ? this.renderAlert() : null}
        {table}
      </div>
    );
  },
};
</script>
