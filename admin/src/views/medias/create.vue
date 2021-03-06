<template>
  <div class="app-container">
    <a-card :bordered="false">
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="/api/plumemo-service/admin/medias/upload"
        @change="handleChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击或者拖拽到区域内上传</p>
        <p class="ant-upload-hint">支持单次或批量上传 最大上传文件大小：2 MB。</p>
      </a-upload-dragger>
    </a-card>
  </div>
</template>

<router>
{
  meta:{
    title: 'New',
  }
}
</router>

<script>
export default {
  name: 'MediaCreate',
  methods: {
    handleChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
