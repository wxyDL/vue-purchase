<template>
  <div class="layout">
    <div class="menu">
      <Menu :collapse="collapse"></Menu>
    </div>
    <div class="content" :class="{active: collapse}">
      <Content @changeCollapse="changeCollapse" :collapse="collapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from "@/viwes/Layout/Menu";
import Content from "@/viwes/Layout/Content";
export default {
  name: "Layout-index",
  components: {
    Menu,
    Content
  },
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.collapse = !this.collapse
      console.log('111')
    }
  }
}
</script>

<style lang="less" scoped>
  .layout{
    .menu{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      background:#112f50;
      .el-menu{
        border-right: none;
      }
    }
    .content{
      transition: all .5s;
      padding-left:200px;
    }
    .active{
      padding-left:65px
    }
  }
</style>