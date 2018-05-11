<template>
<div style="">
    <el-row >
      <transition
            appear
            enter-active-class="animated bounceOutDown"
            appear-active-class="animated bounceInDown"
            >
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-col>
                <span class="span-left"></span>
              </el-col>
              <el-col>
                  <a href="javascript:;">
                    <img class="img-prose" :src="srcImg">
                  </a>
              </el-col>
            </div>
          </el-col>
      </transition>
      <transition
            appear
            name="bounce"
            >
          <el-col :span="16">
            <div class="grid-content bg-purple-light">
              <el-col>
                <span class="span-left"></span>
              </el-col>
              <el-col>
                  <div class="div-title">
                  山东英才学院
                  </div>
                  <div class="div-text">
                      <p style="line-height: 20px">
                        山东英才学院位于山东省会济南，创建于1998年，是济南市第一所民办普通本科高校。
                        山东和济南所具有的区域和人才优势，为学院的发展、为英才学子成长成才提供了优越的条件。
                      </p>
                  </div>
              </el-col>
            </div>
          </el-col>
      </transition>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="div-title">校园一角</div>
      </el-col>
      <el-col :span="24">
        <div>
            <swiper :options="swiperOption" ref="mySwiper" >
              <swiper-slide  v-for="(item, index) in imgList" :key="index" >
                  <img @click="imgClick(item.src)" class="img-swiper animated" :src="item.src" >
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
export default {
  name: 'prose',
  data () {
    return {
      swiperOption: {
        slidesPerView: 3,
        grabCursor: true,
        // width: 800,
        loop: true,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
        delay: 3500,
        stopOnLastSlide: false,
        disableOnInteraction: false
        },
        speed: 500
      },
      srcImg: require('@/assets/style/img/天龙湖.jpg'),
      imgList: [{'id': 1, 'src': require('@/assets/style/img/2.jpg')},
                {'id': 2, 'src': require('@/assets/style/img/1.jpg')},
                {'id': 3, 'src': require('@/assets/style/img/3.jpg')},
                {'id': 4, 'src': require('@/assets/style/img/4.jpg')},
                {'id': 5, 'src': require('@/assets/style/img/5.jpg')},
                {'id': 6, 'src': require('@/assets/style/img/6.jpg')}
      ]
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    imgClick (url) {
      console.log(url)
    }
  }
}
</script>
<style lang="scss" scoped>
  .img-prose {
    width:80%;
    height:80%
  }
  .span-left {
    height: 10%;
  }
  .el-col {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .div-title {
    color: #ff9800;
    font-family: cursive;margin-bottom: 10px;
    font-size: 20px;
  }
  .div-text {
    text-indent: 2em;
    text-align: left;
    width: 100%
  }
  .img-swiper {
    border-radius:10%;
  }
  .img-swiper:hover{
    -webkit-animation-name:swing;
    animation-name:swing;
  }
  .bounce-enter-active {
  animation: bounce-in 1.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 1s reverse;
  }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
