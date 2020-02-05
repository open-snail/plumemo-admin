<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical" :form="form" class="form">
          <a-form-item
            label="昵称"
          >
            <a-input
              placeholder="给自己起个名字"
              v-decorator="['name', { rules: [{ required: true, message: '昵称不能为空', whitespace: true }] }]"/>
          </a-form-item>
          <a-form-item
            label="个人简介"
          >
            <a-textarea rows="4" placeholder="介绍一下自己吧!" v-decorator="['introduction']"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
            <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus"/>
          </div>
          <img :src="this.info.avatar"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" :imgUrl="this.info.avatar"/>

  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import AvatarModal from './AvatarModal'
import { mapState } from 'vuex'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      // cropper
      preview: {},
      form: this.$form.createForm(this, { name: 'update_profile' })
    }
  },
  created () {
    this.handleEdit()
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  methods: {
    setavatar (url) {
      updateUser({
        'avatar': url
      })
        .then(response => {
          this.$notification.success({
            message: '更新个人资料成功'
          })

          this.$store.dispatch('GetInfo')
        })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          updateUser(values)
            .then(response => {
              this.$notification.success({
                message: '更新个人资料成功'
              })
            })
        }
      })
    },
    handleEdit (record) {
      this.form = this.$form.createForm(this, {
        onFieldsChange: (_, changedFields) => {},
        mapPropsToFields: () => {
          return {
            name: this.$form.createFormField({
              value: this.info.name
            }),
            introduction: this.$form.createFormField({
              value: this.info.introduction
            })
          }
        },
        onValuesChange: (_, values) => {
          console.log(values)
        }
      })
      this.drawerVisible = true
    },
    resetForm () {
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
