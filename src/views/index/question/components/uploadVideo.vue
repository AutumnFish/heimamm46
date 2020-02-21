<template>
  <div class="upload-video">
    <el-upload
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传视频文件，且不超过2mb
      </div>
    </el-upload>
    <video class="video" :src="videoURL" controls></video>
  </div>
</template>

<script>
export default {
  name: 'uploadVideo',
  props:{
      video:String
  },
  data() {
    return {
      // 本地的视频预览地址
      videoURL: '',
      // 上传地址
      uploadURL: process.env.VUE_APP_URL + '/question/upload'
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // 本地的视频预览地址
      this.videoURL = URL.createObjectURL(file.raw);
      // window.console.log(res);
      // 同步到父组件中
      this.$emit("update:video",res.data.url)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'video/mp4';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传只能是视频格式！');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.upload-video {
  // 预览视频的样式
  .video {
    width: 360px;
    height: 240px;
  }
}
</style>
