<template>
  <el-upload
      :action="upload"
      :limit="2"
      multiple
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
import {upload, host} from '@/api/base'
export default {
  name: "GoodsUpload",
  data () {
    return {
      upload
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log('file, fileList', file, fileList)
    },
    dialogVisible () {

    },
    dialogImageUrl () {

    },
    handlePictureCardPreview (file) {
      console.log('file----', file)
    },
    handleSuccess (response, file, fileList) {
      console.log('response, file, fileList',response, file, fileList)
      console.log(response.url)
      let pic = response.url.slice(7)
      let picUrl = host + '//' + pic
      this.$emit('getPicUrl', picUrl)
    }
  }
}
</script>

<style scoped>

</style>