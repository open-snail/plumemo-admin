<template>
  <div>
    <div class="table-page-search-wrapper">

      <a-modal v-model="drawerVisible" title="博客搬家">
        <template slot="footer">
          <a-button key="back" @click="onClose">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit" v-show="activeKey === '2'">
            提交
          </a-button>
        </template>
        <a-spin tip="正在导入数据，请等待片刻" :spinning="spinning">
          <a-tabs
            defaultActiveKey="1"
            tabPosition="top"
            :style="{ height: '450px'}"
            @change="callback"
          >
            <a-tab-pane tab="md文件" key="1">
              <a-upload
                action="/api/blog/blog-move/v1/file/"
                :defaultFileList="defaultFileList"
                v-decorator="['files']"
                :headers="header"
                @change="handleChange"
                multiple
              >
                <a-button> <a-icon type="upload" /> 上传 </a-button>
              </a-upload>
            </a-tab-pane>
            <a-tab-pane tab="数据库导入" key="2">
              <a-form :form="form" @submit="handleSubmit" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-row class="form-row" :gutter="16">
                  <a-col :lg="24" :md="12" :sm="24">
                    <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''" label="用户名">
                      <a-input
                        v-decorator="[
                          'username',
                          { rules: [{ required: true, message: '请输入mysql用户名!' }] },
                        ]"
                        :allowClear="allowClear"
                        placeholder="mysql用户名"
                      >
                        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''" label="密码">
                  <a-input
                    v-decorator="[
                      'password',
                      { rules: [{ required: true, message: '请输入mysql密码!' }] },
                    ]"
                    type="password"
                    placeholder="mysql密码"
                    :allowClear="allowClear"
                  >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item label="数据库">
                  <a-input
                    v-decorator="[
                      'database',
                      { rules: [{ required: true, message: '请输入数据库名称!' }] },
                    ]"
                    placeholder="database"
                    :allowClear="allowClear"
                  >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item label="端口">
                  <a-input-number
                    id="inputNumber"
                    :min="1"
                    :max="65535"
                    v-decorator="[
                      'port',
                      { rules: [{ required: true, message: '请输入数据库ip地址!' }] },
                    ]"
                    :step="1"
                    :precision="0"/>
                </a-form-item>
                <a-form-item label="ip">
                  <a-input
                    v-decorator="[
                      'ip',
                      { rules: [{ required: true, message: '请输入数据库ip地址!' }] },
                    ]"
                    placeholder="ip"
                    :allowClear="allowClear"
                  >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item label="博客">
                  <a-select
                    v-decorator="[
                      'blogType',
                      { rules: [{ required: true, message: '请选择博客!' }] },
                    ]"
                    placeholder="请选择博客"
                  >
                    <a-select-option value="wordpress">wordpress</a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
        </a-spin>
      </a-modal>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import {
  importDataByDB
} from '@/api/article'
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
export default {
  name: 'ImportForm',
  props: {
  },
  components: {
    AFormItem
  },
  data () {
    return {
      hasErrors,
      drawerVisible: false,
      allowClear: true,
      defaultFileList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      port: 3306,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      header: {
        'Authorization': Vue.ls.get(ACCESS_TOKEN)
      },
      spinning: false,
      loading: false,
      activeKey: 1
    }
  },
  methods: {
    showDrawerVisible (status) {
      this.drawerVisible = status
    },
    onClose () {
      this.drawerVisible = false
    },
    callback (key) {
      this.activeKey = key
      console.log(key)
    },
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.spinning = true
          this.loading = true
          console.log('Received values of form: ', values)
          importDataByDB(values).then(res => {
            console.log(res)
            this.$notification.success({
              message: '数据导入成功'
            })
            this.$emit('refreshTable')
            this.drawerVisible = false
            this.spinning = false
            this.loading = false
          }).catch(err => {
            this.spinning = false
            this.loading = false
          })
        }
      })
    },
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done' && info.file.response.success === 1) {
        this.$message.success(`${info.file.name} 导入数据成功`)
      } else {
        this.$message.error(`${info.file.name} 导入数据 ${info.file.response.message}`)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  }
}
</script>

<style scoped>

</style>
