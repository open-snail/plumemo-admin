<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" :placeholder="$t('table.title')" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" label="分类名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标签名称">
        <template slot-scope="{row}">
          <span v-for="tag in row.tagsList" :key="tag.id" style="margin-right: 5px"><el-tag type="info">{{ tag.name }}</el-tag></span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(row.id)">
            编辑
          </el-button>
          <el-button type="warning" size="small" icon="el-icon-delete" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 85%; margin-left:50px;">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item style="width: 85%;" label-position="right" label-width="100px" label="标签">
          <el-tag
            v-for="(tag, index ) in dynamicTags"
            :key="index"
            closable
            :disable-transitions="false"
            style="margin-right: 5px"
            @close="handleClose(tag)"
          >
            {{ tag.name }}
          </el-tag>
          <el-autocomplete
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            value-key="name"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="Enter添加标签"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelect"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
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
import { createCategory, fetchCategoryList, fetchCategory, updateCategory, deleteCategory } from '@/api/category'
import { fetchTagsList } from '@/api/tags'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: '',
  components: {
    Pagination
  },
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
        page: 1,
        size: 20,
        keywords: ''
      },
      textMap: {
        update: '更新标签',
        create: '新增标签'
      },
      temp: {
        id: undefined,
        name: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        name: [{ required: true, message: '标签名称必填', trigger: 'blur' }]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      restaurants: []
    }
  },
  created() {
    this.getList()
    this.getTagsList()
  },
  mounted() {
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCategoryList(this.listQuery).then(response => {
        this.list = response.models
        this.listQuery = response.pageInfo
        this.total = response.pageInfo.total
        this.listLoading = false
      })
    },
    getTagsList() {
      fetchTagsList().then(response => {
        this.restaurants = response.models
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
    handleUpdate(id) {
      this.inputVisible = false
      this.resetTemp()

      fetchCategory(id).then(res => {
        this.temp = res.model
        this.dynamicTags = res.model.tagsList
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handleDelete(id) {
      deleteCategory(id).then(res => {
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
          createCategory({
            name: this.temp.name,
            tagsList: this.dynamicTags
          }).then(res => {
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
          updateCategory({
            id: this.temp.id,
            name: this.temp.name,
            tagsList: this.dynamicTags
          }).then(res => {
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
      const index = this.restaurants.findIndex((value, index, array) => {
        return value.id === tag.id
      })
      if (tag.id !== null && index === -1) {
        this.restaurants.push(tag)
      }
    }
  }
}
</script>

<style scoped>

</style>
