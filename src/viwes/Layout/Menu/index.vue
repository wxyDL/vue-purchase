<template>
    <el-menu
        class="el-menu-vertical-demo"
        router
        :collapse="collapse"
        background-color="#112f50"
        active-text-color="#ffd04b"
        :default-active="activeMenu()"
        text-color="#fff">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods/list">产品列表</el-menu-item>
          <el-menu-item index="/goods/category">产品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/ordermange">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/ordermange/orderlist">订单列表</el-menu-item>
          <el-menu-item index="/ordermange/orderauditing">订单审批</el-menu-item>
          <el-menu-item index="/ordermange/ordercallect">汇总清单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">广告分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">广告列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">角色管理</el-menu-item>
          <el-menu-item index="1-2">组织管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: "menu-index",
  data () {
    return {
      // collapse: false
    }
  },
  props: ['collapse'],
  methods: {
    activeMenu () {
      console.log(this.$route)
      let {path, meta} = this.$route
      if (meta.activeMenu) return meta.activeMenu
      return path
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
/deep/ .is-active{
  background: #1e78bf !important;
  color: #ffd04b !important;
}
}
</style>