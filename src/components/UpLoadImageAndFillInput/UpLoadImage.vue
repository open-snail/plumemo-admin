<template>
  <div style="background-color: white">
    <a-input
      :placeholder="placeholder"
      @blur="changeUrl"
      v-model="url"/>
    <a-upload
      action="/api/blog/file/file/v1/upload/"
      listType="picture-card"
      :fileList="fileList"
      :remove="handleRemove"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    placeholder: {
      type: String
    }
  },
  components: {
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [
      ],
      url: null
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList

      if (fileList[0] !== undefined && fileList[0].response !== undefined) {
        this.url = fileList[0].response.extra
        this.$emit('getImageUrl', this.url)
      }
    },
    handleRemove (file) {
      this.url = null
    },
    handleUrl (url) {
      this.url = url
      this.fileList = []
      this.changeUrl()
      this.$emit('getImageUrl', url)
    },
    changeUrl () {
      if (this.url !== null && this.url !== undefined) {
        this.fileList = [{
          uid: '-1',
          name: '上传图片',
          status: 'done',
          url: this.url
        }]
        this.$emit('getImageUrl', this.url)
      } else {
        this.fileList = []
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
