<template>
  <div>
<!--    顶部-->
    <div class="header">
      <div class="icon">
        <i v-if="!collapse" @click="changeCollapse" class="iconfont icon-right-indent"></i>
        <i v-else @click="changeCollapse" class="iconfont icon-left-indent"></i>
      </div>
      <div class="right">
        <span style="margin-right: 10px">当前时间：{{currentTime}}</span>
        <span>用户名：</span>
        <span class="logout" @click="logout">退出</span>
      </div>
    </div>
<!--    内容-->
    <router-view></router-view>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "content-index",
  data () {
    return {
      currentTime: ''
    }
  },
  created() {
    this.currentTime = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
  },
  methods: {
    changeCollapse () {
      this.$emit('changeCollapse')
    },
    logout () {

    }
  },
  props:['collapse']
}
</script>

<style lang="less" scoped>
  .header{
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgb(129,201,237);
    .icon{
      i{
        font-size: 28px;
      }
    }
    .right{
      text-align: right;
      flex: 1;
      padding-right:10px;
      color: #fff;
      .logout{
        cursor: pointer;
      }
    }
  }
</style>