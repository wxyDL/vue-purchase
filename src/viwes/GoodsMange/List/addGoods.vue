<template>
  <div class="add-goods">
    <el-row :gutter="20">
      <el-col :span="3"><div class="navBar">
        <el-card>
          <p class="navBar-title">产品分类列表</p>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </div></el-col>
      <el-col :span="20"><div class="content">
        <el-card>
<!--          <p class="content-title">添加商品</p>-->
          <el-alert
              title="添加商品"
              type="info"
              :closable="false">
          </el-alert>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属分类" prop="name">
              <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="6">
                <el-form-item label="产品编号" prop="num">
              <el-input v-model="ruleForm.num" placeholder="自动生成编号" disabled></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="规格" prop="specs">
              <el-input v-model.trim="ruleForm.specs" placeholder="请输入产品规格"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="库存" prop="stock">
              <el-input v-model.trim="ruleForm.stock" placeholder="请输入库存"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品价格" prop="price">
              <el-input v-model.trim="ruleForm.price" placeholder="请输入产品价格"></el-input>
            </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="产品说明">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="图片上传">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
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
            <el-form-item label="活动性质" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
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
export default {
  name: "addGoods",
  data() {
    return {
      ruleForm: {
        name: '',
        specs: '',
        stock: '',
        price: '',
        date1: '',
        title: '',
        date2: '',
        isBanner: false,
        isSell: true,
        isPut: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        specs: [
          { required: true, message: '请输入产品规格', trigger: 'blur' },
        ],
        stock: [
          { required: true, message: '请输入库存', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请输入产品价格', trigger: 'blur' },
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push('/goods/list');
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