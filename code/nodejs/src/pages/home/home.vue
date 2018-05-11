<template>
  <div >
   <el-container style="height:620px; border: 1px solid #eee;">
      <el-header style="height: 45px;">
        <el-row :gutter="20">
          <el-col :span="20" style="margin-top: 5px;"><div class="grid-content bg-purple">学校管理系统</div></el-col>
          <el-col :span="4"  style="height: 43px;">
            <div class="grid-content bg-purple-light">
               <span style="margin-right:8px;color:#fff;">{{this.$store.getters.user.userName}}</span>
              <el-dropdown trigger="hover" >
                <span class="el-dropdown-link">
                  <a href="javascript:;" @click="imgClick">
                  <img  class="img-admin" :src="srcImg">
                  </a>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item @click.native="userClick">设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="outClick">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
    <el-container>
    <el-aside width="220px">
      <el-menu
      unique-opened
      :router="tabLis.length < 5"
      :default-active="path"
      class="el-menu-vertical-demo"
      style="height:573px;"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      >
        <el-submenu v-for="(item, index) in $router.options.routes"
          v-if="item.children" :key="index" :index="index +''" >
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span>{{item.title}}</span>
          </template>
            <el-menu-item  v-for="item1 in item.children" :index="item1.path" :key="item1.path" @click="menuClick(item1)">
              {{item1.title}}
              </el-menu-item>
        </el-submenu>
    </el-menu>
    </el-aside>
    <el-container>
      <div class="main-div">
        <div style="height:45px;">
          <el-tabs v-model="tabName"    type="card" closable @tab-remove="removeClick" @tab-click="tabsClick" >
            <el-tab-pane v-for="(item, index) in tabLis" :key="index"  :label="item.title" :name="item.name" >
            </el-tab-pane>
           </el-tabs>
        </div>
      </div>
      <el-main>
          <keep-alive>
          <router-view ></router-view>
          </keep-alive>
      </el-main>
      <el-footer style="height:46px;">
        <home-footer></home-footer>
      </el-footer>
    </el-container>
  </el-container>
</el-container>
<el-dialog
        title="设置"
        :visible.sync="setupDialog"
        @close="dialogClose('ruleForm')"
        >
        <el-form :model="ruleForm"  ref="ruleForm" label-width="200px"  class="demo-ruleForm">
          <el-form-item label="姓名" prop="name" >
            <el-input clearable v-model="ruleForm.name" placeholder="请输入姓名" style="width: 65%"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="0" style="margin-right:20px">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上传头像" >
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="srcImg" :src="srcImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
</div>
</template>
<script>
import HomeFooter from './components/homeFooter'
export default {
  name: 'home',
  components: {
    HomeFooter
  },
  data () {
    return {
      collapsed: false,
      tabLis: [],
      invalue: '',
      toggle: '',
      tabList: [],
      path: this.$route.path,
      tabName: '',
      srcImg: require('@/assets/style/img/userImg.png'),
      setupDialog: false,
      ruleForm: {
          name: '',
          sex: '',
          school: '',
          class: '',
          admin: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('点击button')
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    onPageDown () {
      // console.log('按下了pgDn的键盘了')
    },
    tabsClick (target) {
      // this.$route.params
        this.$router.push({name: target.name})
        this.path = '/' + target.name
    },
    menuClick: function (item) {
        if (this.tabList.length > 4 && this.tabList.indexOf(item.name) > -1) {
           this.$router.push({name: item.name})
           this.tabName = item.name
        } else {
          let isTrue = false
          this.tabLis.forEach((tab) => {
            if (tab.title === item.title) {
                isTrue = true
            }
          })
          if (!isTrue) {
            if (this.tabLis.length > 4) {
              this.$message('最多只能添加5个标签')
            } else {
              this.tabLis.push({'name': item.name, 'title': item.title, 'path': item.path})
              this.tabName = item.name
              this.tabList.push(item.name)
            }
          } else {
              this.tabName = item.name
          }
        }
    },
    removeClick: function (targetName) {
      if (this.tabLis.length < 2) {
        this.$message('最少剩余1个标签')
        return false
      } else {
        this.tabList.splice(this.tabList.indexOf(targetName), 1)
      }
      let activeName = this.tabName
        if (activeName === targetName) {
        this.tabLis.forEach((tab, index) => {
            if (targetName === tab.name) {
            let nextTab = this.tabLis[index + 1] || this.tabLis[index - 1]
            if (nextTab) {
                activeName = nextTab.name
                this.path = nextTab.path
            }
            }
        })
        }
        this.tabName = activeName
        this.tabLis = this.tabLis.filter(tab => tab.name !== targetName)
        this.$router.push({name: activeName})
    },
    imgClick (event) {
      console.log(event)
    },
    userClick () {
      this.setupDialog = true
    },
    outClick () {
      this.$confirm('是否退出当前系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let user = {'userName': '', 'password': ''}
          this.$store.commit('increment', user)
          console.log('退出')
          this.$router.push({path: 'login'})
        }).catch(() => {
        });
    },
    dialogClose (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style lang="scss">
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  text-align: center;
  padding: 10px;
  background: #DCDFE6 no-repeat 0 0;
}
.main-div {
  text-align: center;
  height: 45px;
  margin-top: 1px;
  margin-bottom: 4px;
}
.img-admin {
  height: 42px;
  width: 42px;
  border-radius:50%;
  overflow:hidden;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
