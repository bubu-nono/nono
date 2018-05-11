<template>
  <div >
       <el-tabs v-model="editableTabsValue2"    type="card" closable @tab-click="tabClick"  @tab-remove="removeClick" >
         <el-tab-pane v-for="(item, index) in tabLis" :key="item.id"  :label="item.label" :name="item.name" >
            <tab-list :index="index" :name="index" :key="item.id"></tab-list>
           {{index}}</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import TabList from './TabList'
export default {
  name: 'list',
  components: {
    TabList
  },
  data: function () {
    return {
      tabLis: [
        {'id': 1, 'name': '1', 'label': '我的行程'},
        {'id': 2, 'name': '2', 'label': '消息中心'},
        {'id': 3, 'name': '3', 'label': '角色管理'},
        {'id': 4, 'name': '4', 'label': '定时任务补偿'}
      ],
      editableTabsValue2: '1'
    }
  },
  methods: {
    removeClick: function (targetName) {
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        this.tabLis.forEach((tab, index) => {
          if (targetName === tab.name) {
            let nextTab = this.tabLis[index + 1] || this.tabLis[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue2 = activeName
      this.tabLis = this.tabLis.filter(tab => tab.name !== targetName)
    },
    tabClick: function (params) {
    }
  }
}
</script>
