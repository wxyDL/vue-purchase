<template>
  <div class="add-goods">
    <el-row :gutter="20">
      <el-col :span="3"><div class="navBar">
        <el-card>
          <p class="navBar-title">产品分类列表</p>
          <goods-tree @changGoodsCategory="changGoodsCategory"></goods-tree>
        </el-card>
      </div></el-col>
      <el-col :span="20"><div class="content">
        <el-card>
          <el-alert
              title="添加商品"
              type="info"
              :closable="false">
          </el-alert>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属分类" prop="category">
              <el-input v-model="ruleForm.category" disabled></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="6">
                <el-form-item label="规格" prop="specs">
              <el-input v-model.trim="ruleForm.specs" placeholder="请输入产品规格"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="库存" prop="num">
              <el-input v-model.trim="ruleForm.num" placeholder="请输入库存"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品价格" prop="price">
              <el-input v-model.trim="ruleForm.price" placeholder="请输入产品价格"></el-input>
            </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="产品描述">
              <goods-wang-editor @getWangEditorHtml="getWangEditorHtml"></goods-wang-editor>
            </el-form-item>
            <el-form-item label="图片上传">
              <goods-upload @getPicUrl="getPicUrl"></goods-upload>
            </el-form-item>
            <el-form-item label="首页轮播推荐" prop="isBanner">
              <el-switch v-model="ruleForm.isBanner"></el-switch>
            </el-form-item>
            <el-form-item label="是否推荐产品" prop="isSell">
              <el-switch v-model="ruleForm.isSell"></el-switch>
            </el-form-item>
            <el-form-item label="是否上架产品" prop="isPut">
              <el-switch v-model="ruleForm.isPut"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="resetForm">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import GoodsTree from "@/viwes/GoodsMange/List/GoodsTree";
import GoodsWangEditor from "@/viwes/GoodsMange/List/GoodsWangEditor";
import GoodsUpload from "@/viwes/GoodsMange/List/GoodsUpload";
export default {
  name: "addGoods",
  components: {
    GoodsTree,
    GoodsUpload,
    GoodsWangEditor
  },
  data() {
    return {
      ruleForm: {
        category: '',
        specs: '',
        price: '',
        title: '',
        isBanner: true,
        isSell: true,
        isPut: true,
        type: [],
        resource: '',
        descs: '',
        image: [],
        cid: ''
      },
      rules: {
        category: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: '请输入产品规格', trigger: 'blur' },
        ],
        num: [
          { required: true, message: '请输入库存', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入产品价格', trigger: 'blur' },
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
      },
    };
  },
  methods: {
    //title cid  category sellPoint price num descs paramsInfo image
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const  {
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            descs,
            paramsInfo,
            image
          } = this.ruleForm
          this.$api.addGoods({
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            descs,
            paramsInfo,
            image: JSON.stringify(image)
          }).then(res => {
            if (res.data.status === 200) {
              this.$router.push('/goods/list')
              this.$message.success('添加商品成功！')
            } else {
              this.$message.error('添加商品失败！')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push('/goods/list');
    },
    //获取商品类目
    changGoodsCategory (node) {
      console.log(node.data)
      this.ruleForm.category = node.data.name
      this.ruleForm.cid = node.data.cid
    },
    //获取富文本编辑器里的内容
    getWangEditorHtml (text) {
      this.ruleForm.descs = text
      console.log(text)
    },
    getPicUrl (picUrl) {
      console.log(picUrl)
      this.ruleForm.image.push(picUrl)
      console.log(this.ruleForm.image)
    }
  }
}
</script>

<style lang="less" scoped>
.add-goods {
  padding: 10px;
  .navBar{
    //border: 1px solid #ddd;
    height: 600px;
  }
  .content{
    .demo-ruleForm{
      margin-top: 20px;
    }
  }
}
</style>