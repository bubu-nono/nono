<template>
  <div>
      <el-tabs v-model="editableTabsValue2"    type="card" closable @tab-remove="removeClick" >
         <el-tab-pane v-for="(item, index) in tabLis" :key="item.id"  :label="item.label" :name="item.name" >
            <!-- <tab-list :index="index" :name="index" :key="item.id"></tab-list> -->
           {{index}}</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: ['tabs'],
  data () {
    return {
      tabLis: this.tabs,
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
<style lang="stylus" scoped>
</style>
