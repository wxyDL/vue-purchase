<template>
  <div class="goods-list">
    <el-row>
      <el-col :span="12">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name" placeholder="请输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="margin: 0px 0 20px 0px">
      <el-col :span="9">
        <el-button type="warning" icon="el-icon-plus" @click="addGoods">添加商品</el-button>
        <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-search" @click="goodsSearch">查询</el-button>
        <el-button type="info" icon="el-icon-search" @click="searchReset">重置</el-button>
      </el-col>
    </el-row>
      <el-table
          :data="tableData"
          border
          style="width: 100%;margin-bottom: 20px">
        <el-table-column
            type="selection"
            >
        </el-table-column>
        <el-table-column
            prop="cid"
            label="产品编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="title"
            label="产品名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格">
        </el-table-column>
        <el-table-column
            prop="num"
            label="库存">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        background
        layout="total, sizes, prev, pager, next, jumper"
        style="text-align: right"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "goods-list",
  data () {
    return {
      formInline: {
        name: '',
        date: ''
      },
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  created() {
    this.getGoodsListData()
  },
  methods: {
    // 获取商品列表
    getGoodsListData () {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      }
      console.log(params);
      this.$api.getGoodsList(params).then(res => {
        console.log(res.data)
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
  //  产品查询
    goodsSearch () {
      if (this.formInline.name === '') {
        this.$message.error('查询的产品为空')
      } else {
        const params = {
          page: 1,
          pageSize: 10,
          search: this.formInline.name
        }
        console.log(params);
        this.$api.goodsSearch(params).then(res => {
          console.log(res)
          this.tableData = res.data.result
        })
      }
    },
    searchReset () {
      this.formInline.name = ''
      this.getGoodsListData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getGoodsListData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getGoodsListData()
    },
  //  产品删除
    handleDelete (row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id
        }
        this.$api.deleteGoods(params).then(res => {
          if (res.data.status === 200) {
            this.$message.success('删除成功')
            this.getGoodsListData()
          } else {
            this.$message.error('删除成功')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(row)
    },
  //  添加商品
    addGoods () {
      this.$router.push('/goods/addgoods')
    }
  }
}
</script>

<style scoped>
.goods-list {
  padding: 20px;
}
</style>