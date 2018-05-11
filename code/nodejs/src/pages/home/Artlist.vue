<template>
  <div>
    <el-table :data="customerList"  highlight-current-row  stripe height="415" style="width: 100%;"
                v-loading="tableLoading" @selection-change="selectCheck">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column property="name" label="姓名" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>学校: {{ scope.row.school }}</p>
              <div slot="reference" class="name-wrapper">
                <label size="medium">{{ scope.row.name }}</label>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="sex" label="性别" show-overflow-tooltip align="center" :formatter="formatSex"></el-table-column>
        <el-table-column property="school" label="学校" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="class" label="班级" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column property="admin" label="是否管理员" show-overflow-tooltip align="center">
          <div slot-scope="scope" style="float:center">
              <el-switch
                  style="display: block"
                  v-model="scope.row.admin"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是"
                  inactive-text="否">
              </el-switch>
          </div>
        </el-table-column>
        <el-table-column label="操作" width="200" show-overflow-tooltip>
          <div slot-scope="scope" style="float:center">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-error"
              @click="handleDelete(scope)">删除
            </el-button>
          </div>
        </el-table-column>
      </el-table>
        <el-pagination
          style="margin-top:8px;"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"  background
          :current-page.sync="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          layout="sizes, prev, pager, next, jumper, total"
          :total="totalAll">
        </el-pagination>
        <el-dialog
          :title="title"
          :visible.sync="deleteDialog"
          width="30%"
          >
          <span>你确定要删除<label style="color:#ffcc00">{{deleteName}}</label>吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteDialog = false;clickDelete()">确 定</el-button>
          </span>
        </el-dialog>
      <el-dialog
        :title="title"
        :visible.sync="editDialog"
        >
        <el-form :model="ruleForm"  ref="ruleForm" label-width="80px">
          <el-form-item label="姓名" prop="name" >
            <el-input clearable v-model="ruleForm.name" placeholder="请输入姓名" style="width:60%;margin-right: 35%"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex" style="width:23%;margin-right: 65%">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学校"  prop="school">
            <el-select v-model="ruleForm.school" clearable  placeholder="请选择学校" style="width:60%;margin-right: 35%">
              <el-option label="山东英才学院/南校区" value="山东英才学院/南校区"></el-option>
              <el-option label="山东英才学院/北校区" value="山东英才学院/北校区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-select v-model="ruleForm.class" clearable  placeholder="请选择班级" style="width:60%;margin-right: 35%">
              <el-option label="计算机及应用1班" value="计算机及应用1班"></el-option>
              <el-option label="计算机及应用2班" value="计算机及应用2班"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  style="margin-left: 2px">
            <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'artlist',
  data () {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSizes: [5, 10, 20, 50],
        pageSize: 5
      },
      deleteName: '',
      ruleForm: {
          name: '',
          sex: '',
          school: '',
          class: '',
          admin: ''
        },
      title: '',
      tableLoading: false,
      editDialog: false,
      deleteDialog: false,
      customerList: [],
      customerGroupList: [
      {'name': '陈新', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': true},
      {'name': '薛宇航', 'sex': '1', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false},
      {'name': '冯昊', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': true},
      {'name': '王子玉', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': true},
      {'name': '何灿', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false},
      {'name': '杨飞', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false},
      {'name': '王炳林', 'sex': '1', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false},
      {'name': '杨君豪', 'sex': '1', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false},
      {'name': '郭辉', 'sex': '1', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': true},
      {'name': '田野', 'sex': '0', 'school': '山东英才学院/南校区', 'class': '计算机及应用1班', 'admin': false}]
    }
  },
  mounted () {
    console.log("文章初始化了")
    this.getData()
  },
  computed: {
    totalAll: function () {
      return this.customerGroupList.length
    }
  },
  methods: {
    getData () {
      this.customerList = this.customerGroupList.filter((t, index) => index < this.page.pageSize)
    },
    formatSex: function (row) {
      return row.sex === '0' ? '男' : '女';
    },
    handleEdit (scope) {
      this.title = '编辑'
      this.editDialog = true
      this.ruleForm = scope.row
      // console.log(scope.$index)
      // console.log(scope.row.name)
    },
    handleDelete (scope) {
      this.deleteName = scope.row.name
      this.title = '删除'
      this.deleteDialog = true
    },
    clickDelete () {
      this.$message({
        message: '恭喜你，删除成功',
        type: 'success'
      })
      this.customerList = this.customerGroupList.filter(t => t.name !== this.deleteName)
      this.deleteDialog = false
      console.log(this.customerList)
    },
    handleClose (event) {
      console.log(event)
    },
    submitForm (formName) {
      this.$message({
        message: '恭喜你，修改成功',
        type: 'success'
      })
      this.editDialog = false
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    selectCheck (selection) {
      console.log(selection)
    },
    handleCurrentChange(val) {
      let pageS = this.page.pageSize
      console.log(pageS)
      this.customerList = this.customerGroupList.filter(
        function (item, index, arr) {
          if (val > 1) {
            return (index > pageS)
          } else {
            return (index < pageS)
          }
        })
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(val)
      this.customerList = this.customerGroupList.filter((item, index) => index < val)
    }
  }
}
</script>
<style>
  /* @keyframes dialog-fade-in {
    0% {
      transform: translate3d(0, 100%, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  } */
</style>
