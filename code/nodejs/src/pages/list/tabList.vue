<template>
  <div>
      <el-table :data="customerGroupList" border highlight-current-row  style="width: 100%"
                v-loading="tableLoading">
        <el-table-column type="index" width="70"></el-table-column>
        <el-table-column property="name" label="组名" show-overflow-tooltip></el-table-column>
        <el-table-column property="index" label="销售组织" show-overflow-tooltip></el-table-column>
        <el-table-column property="lineName" label="产品线" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200" show-overflow-tooltip>
        </el-table-column>
      </el-table>
       <router-view/>
  </div>
</template>
<script>
export default {
  props: ['index', 'name'],
  data () {
    return {
      tableLoading: false,
      customerGroupList: [{'index': this.index, 'name': this.name}]
    }
  },
   watch: {
    '$route' (to, from) {
      console.log('watch监听')
      // 对路由变化作出响应...
    }
  },
  mounted: function () {
  console.log('实例创建了')
  this.$nextTick(function () {
    console.log('被挂载了')
  })
}
}
</script>
<style>
</style>
