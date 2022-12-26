<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class='num'>{{homeData.saleTotal | numFilters}}</div>
        <div class="bottom">今日销售额：{{homeData.sale | numFilters}}</div>
      </div>
      <div class="item">访问量
        <div class='num'>{{homeData.viewsTotal | numFilters}}</div>
        <div class="bottom">今日访问量：{{homeData.views | numFilters}}</div>
      </div>
      <div class="item">访问量
        <div class='num'>{{homeData.collectTotal | numFilters}}</div>
        <div class="bottom">今日销售额：{{homeData.collect | numFilters}}</div>
      </div>
      <div class="item">支付量
        <div class='num'>{{homeData.payTotal | numFilters}}</div>
        <div class="bottom">今日支付量：{{homeData.pay | numFilters}}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id='box13'>
        <div class="title">月销售额</div>
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
<!--      <div class="area" id="box1">比例分配</div>-->
      <div class="area" id="box1">产品销售比例
        <div id="main2" style="width: 100%; height: 300px"></div>
      </div>
    </div>


    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <p>今日订单数</p>
              <div>{{orderData.curCollect}}</div>
            </el-col>
            <el-col :span="8">
              <p>汇总确认订单</p>
              <div>{{orderData.curOrderCount}}</div>
            </el-col>
            <el-col :span="8">
              <p>累积金额</p>
              <div>{{orderData.curMoney}}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <p>本月订单数</p>
              <div>{{orderData.collect}}</div>
            </el-col>
            <el-col :span="8">
              <p>累积金额</p>
              <div>{{orderData.money}}</div>
            </el-col>
            <el-col :span="8">
              <p>汇总确认订单数</p>
              <div>{{orderData.orderCount}}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button @click="productRouter">产品管理</el-button>
          <el-button @click="orderRouter">订单管理</el-button>
          <el-button @click="adminRouter">系统管理</el-button>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
name: 'home-index',
  data () {
  return {
  //  首页数据
    homeData: {},
  //  订单数据
    orderData: {}
  }
  },
  mounted () {
    this.getHomeData()
    this.getDataFormat()
    this.getHomeOrderData()
  },
  methods: {
    //获取首页数据
    getHomeData () {
      this.$api.getHomeCount().then((res) => {
        if (res.status === 200) {
          this.homeData = res.data.data.list
        }
      })
    },
  //  获取月销售额
    getDataFormat () {
      this.$api.getHomeFormat().then(res => {
        console.log(res.data.result.data.sale_money)
        const lineData = res.data.result.data.sale_money
        console.log(res.data.result.data)
        let lineX = [], lineY = [], barY = [], pieData = []
        lineData.forEach(ele => {
          lineX.push(ele.name)
          lineY.push(ele.total_amount)
          barY.push(ele.num)
        //  处理饼图数据
          let pieIObj = {}
          pieIObj.name = ele.name
          pieIObj.value = ele.total_amount
          pieData.push(pieIObj)
        })
        this.line(lineX,lineY,barY)
        this.pie(pieData)
      })
    },
  //  月销售额的可视化
    line (lineX,lineY,barY) {
      var chartDom = document.getElementById('charts');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['销售额', '销售量']
        },
        xAxis: {
          type: 'category',
          data: lineX
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销售额',
            data: lineY,
            type: 'line',
            smooth: true
          },
          {
            name: '销售量',
            data: barY,
            type: 'bar',
            smooth: true
          }
        ]
      };
      option && myChart.setOption(option);
    },
    pie (pieData) {
      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
  //  今日订单数据
    getHomeOrderData () {
      this.$api.getHomeOrderInfo().then(res => {
        this.orderData = res.data.list
      })
    },
    productRouter () {
      this.$router.push('/goods/list')
    },
    orderRouter () {
      this.$router.push('/ordermange/orderlist')
    },
    adminRouter () {
      this.$router.push('')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
.home-footer .text .el-row .el-col{
  text-align: center;
  border-right: 1px solid #eeeeee;
}
.home-footer .text .el-row .el-col:last-child {
  border-right: none;
}
</style>
