<template>
  <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      @node-click="goodsCategoryNode">
  </el-tree>
</template>

<script>
export default {
  name: "GoodsTree",
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1
    };
  },
  methods: {
    async loadNode(node, resolve) {
      if (node.level === 0) {
        let result = await this.getGoodsCategory(1)
        return resolve(result);
      }
      if (node.level >= 1) {
        let result = await this.getGoodsCategory(node.data.cid)
        return resolve(result);
      }
    },
    async getGoodsCategory(type) {
      let res = await this.$api.getGoodsCategory({type})
      if (res.data.status === 200) {
        return res.data.result
      } else {
        return []
      }
    },
    goodsCategoryNode (data, node) {
      this.$emit('changGoodsCategory', node)
    }
  }
}
</script>

<style scoped>

</style>