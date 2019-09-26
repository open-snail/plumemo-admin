<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{
            scope.row.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="文章类型" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status === 1 ? "草稿" : "发布" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="同步状态" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.syncStatus | statusFilter">
            {{ row.syncStatus === 0 ? "未同步" : "已同步" }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{ row }">
          <router-link :to="'/article/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{ row }">
          <span
            v-for="tag in row.tagsList"
            :key="tag.id"
            style="margin-right: 5px"
          ><el-tag type="info">{{ tag.name }}</el-tag></span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="{row}">
          <router-link :to="'/article/edit/' + row.id">
            <el-button type="primary" size="mini">
              {{ $t('table.edit') }}
            </el-button>
          </router-link>
          <el-button v-if="row.status === 1" size="mini" type="success" @click="handleModifyStatus(row,1)">
            {{ $t('table.publish') }}
          </el-button>
          <el-button v-if="row.status === 2" size="mini" @click="handleModifyStatus(row,2)">
            {{ $t('table.draft') }}
          </el-button>
          <el-button v-if="row.syncStatus === 0" size="mini" type="success" @click="handleSync(row)">
            同步
          </el-button>
          <el-button v-if="row.syncStatus === 1" size="mini">
            已同步
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,'deleted')">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList, updateArticleStatus, deletePosts, publishByteBlogs } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '2': 'success',
        '1': 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.models
        this.listQuery = response.pageInfo
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
    handleModifyStatus(row, status) {
      updateArticleStatus({
        id: row.id,
        status: status
      }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      })
    },
    handleSync(row) {
      publishByteBlogs({ 'id': row.id }).then(res => {
        const { success } = res
        if (success === 1) {
          this.$message({
            message: '同步成功',
            type: 'success'
          })
          this.getList()
        }
      })
    },
    handleDelete(row) {
      deletePosts(row.id).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
