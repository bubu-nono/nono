<template>
  <div>
   <el-carousel :interval="3000" type="card" height="300px" :initial-index="0"
    autoplay arrow="always" @change="cardChange" trigger="click" ref="carousel">
    <el-carousel-item v-for="(item, index) in swiperList" :key="item.id">
      <img :src="item.imgUrl" @click="imgClick(item.imgUrl,index)"/>
    </el-carousel-item>
  </el-carousel>
  <div>
    <el-button type="primary" plain @click="setActiveItem('0')">第一个幻灯片</el-button>
    <el-button type="primary" plain @click="setActiveItem('3')">第四个幻灯片</el-button>
  </div>
  </div>
</template>
<script>
export default {
  name: 'pict',
  data () {
    return {
      cardIndex: 0,
      swiperList: [{
        id: '001',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1803/5f/ca85d900b879f02.jpg_640x200_12057e21.jpg'
      }, {
        id: '002',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1712/3a/0b157f83e0cfcc02.jpg_640x200_55aff186.jpg'
      }, {
        id: '003',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/14/21f410d1016c8702.jpg_640x200_84d0effe.jpg'
      }, {
        id: '004',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/49/fc0927ea48ffc602.jpg_640x200_ed3b7ec6.jpg'
      }, {
        id: '005',
        imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/94/619b7b0a6d2e0a02.jpg_640x200_2490ecf0.jpg'
      }]
    }
  },
  mounted () {
    console.log("图片初始化了")
  },
  methods: {
    setActiveItem(index) {
        this.$refs.carousel.setActiveItem(index);
    },
    cardChange (now, old) {
      // 幻灯片切换触发事件 当前index和上一个备切换掉index
      this.cardIndex = now
    },
    imgClick (img, index) {
      if (this.cardIndex === index) {
        alert('点击了当前最中间的图片')
      }
    }
  }
}
</script>

<style  scoped>
.el-carousel__item img {
    color: #475669;
    width: 100%;
    font-size: 14px;
    opacity: 0.75;
    height: 100%;
    line-height: 280px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
