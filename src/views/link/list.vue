<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" placeholder="名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="tagsList" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="LOGO">
        <template slot-scope="{row}">
          <span>{{ row.logo }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="链接">
        <template slot-scope="{row}">
          <span>{{ row.href }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="简介">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="warning" size="small" icon="el-icon-delete" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 85%; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="友情链接网址的名称" />
        </el-form-item>
        <el-form-item label="LOGO" prop="logo">
          <el-input v-model="temp.logo" placeholder="友情链接网址的LOGO"/>
        </el-form-item>
        <el-form-item label="链接" prop="href">
          <el-input v-model="temp.href" placeholder="友情链接的链接地址 eg: https://www.byteblogs.com"/>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input v-model="temp.description" placeholder="ByteBlogs社区是一群技术爱好者打造的以技术为核心的学习,交流社区。"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchLinkList, createLink, updateLink, deleteLink } from '@/api/link'
import waves from '@/directive/waves' // waves directive
export default {
  name: '',
  directives: { waves },
  props: {
  },
  data() {
    return {
      list: null,
      tagsList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        keywords: ''
      },
      textMap: {
        update: '更新标签',
        create: '新增标签'
      },
      temp: {
        id: undefined,
        name: '',
        href: '',
        logo: '',
        description: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: '标签名称必填', trigger: 'blur' }],
        href: [{ required: true, message: '标签名称必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLinkList(this.listQuery).then(response => {
        this.tagsList = response.models
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.inputVisible = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.inputVisible = false
      this.resetTemp()
      this.temp = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(id) {
      deleteLink(id).then(res => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })

        this.getList()
      })
    },
    createData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          createLink(this.temp).then(res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.resetTemp()
            this.getList()
          })
        }
      })
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          updateLink(this.temp).then(res => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.resetTemp()
            this.getList()
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: ''
      }
      this.dynamicTags = []
      this.inputValue = ''
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      if (item) {
        this.dynamicTags.push(item)
        this.restaurants.splice(this.restaurants.indexOf(item), 1)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push({ name: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      if (tag.id !== null) {
        this.restaurants.push(tag)
      }
    }
  }
}
</script>

<style scoped>

</style>
