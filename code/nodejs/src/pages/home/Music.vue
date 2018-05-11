<template>
    <div>
      <model-obj style="height:460px"
          :backgroundAlpha="bgAlpha"
          :backgroundColor="bgColor"
          src="static/models/obj/tree.obj">
      </model-obj>
   </div>
</template>
<script>
import pict from '@/pages/home/pict'
import { ModelObj } from 'vue-3d-model'
export default {
  name: 'music',
  components: {
    pict,
    ModelObj
  },
  data () {
    return {
      bgColor: '#13ce66',
      bgAlpha: 0.5
    }
  },
  mounted () {
    console.log("音乐初始化了")
  }
}
</script>
