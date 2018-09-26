<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slider" v-for="(item, index) in slide" :key="index">
        <div>
          slide {{item}}
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data () {
      return {
        swiperOption:{
          loop:true,
          pagination:{
            el:'.swiper-pagination',
            clickable:true
          }
        },
        slide:[1,2,3,4,5,6]
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
.swiper-slider{
  height: 4rem;
  text-align: center;
  padding-top: .3rem;
  border-bottom: 1px solid #ccc;
}
</style>
