<template>
  <div class="header" >
     <div class="header-left" @click="handClick"><span class="iconfont">&#xe624;</span></div>
     <div class="header-input"> <span class="iconfont">&#xe632;</span>
     <input class="input-calss" v-model="city" placeholder=" 输入城市/景点/游玩主题"/>
     </div>
     <div class="header-right">城市  <span class="iconfont">&#xe64a;</span></div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      city: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
