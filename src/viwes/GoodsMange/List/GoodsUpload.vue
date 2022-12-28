<template>
  <el-upload
      :action="upload"
      :limit="1"
      :file-list="fileList"
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
      upload,
      fileList: []
    }
  },
  created() {
    this.fileListPic()
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
      console.log(picUrl)
      this.$emit('getPicUrl', picUrl)
    },
    //编辑渲染图片
    fileListPic () {
      if (this.$route.query.id) {
        let pic = JSON.parse(sessionStorage.getItem('row'))
        console.log(pic)
        let newStr = pic.image.replace('"', "").replace('"', "")
        this.fileList.push({url: newStr})
        console.log(this.fileList)
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>