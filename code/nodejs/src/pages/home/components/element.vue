<template>
  <div class="header" >
      <el-button @click="visible = true">Button</el-button>
        <el-dialog :visible.sync="visible" title="Hello world">
        <p>Try Element</p>
        </el-dialog>
 <el-table :data="customerGroupList" border highlight-current-row  style="width: 100%"
                v-loading="tableLoading" >
        <el-table-column type="index" align="center" width="70"></el-table-column>
        <el-table-column property="name" label="姓名"  align="center"  show-overflow-tooltip></el-table-column>
        <el-table-column property="age" label="年龄"  align="center"  show-overflow-tooltip></el-table-column>
        <el-table-column property="sex" label="性别"  align="center"  show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200"  align="center"  show-overflow-tooltip  >
          <div  slot-scope="scope" >
            <el-button
              size="small"
              type="primary"
              @click="handClick(scope)">查看
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click.native.prevent="modifyItem(scope);dialogFormVisibless = true">编辑
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click.native.prevent="confirmDel(scope)">删除
            </el-button>
          </div>
        </el-table-column>
      </el-table>

  </div>
</template>
<script>
export default {
  name: 'HomeElement',
  data () {
    return {
      city: '',
      visible: false,
      tableLoading: false,
      customerGroupList: [{'name': '小白', 'age': '13', 'sex': '男'}]

    }
  },
  methods: {
    handClick: function (scope) {
      console.log(scope.row.name)
    }
  }
}
</script>
<style>
</style>
