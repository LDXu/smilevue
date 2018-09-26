<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
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
          direction: 'vertical',
          pagination:{
            el:'.swiper-pagination'
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
  line-height: 4rem;
  /* padding-top: .3rem; */
  /* border-bottom: 1px solid #ccc; */
}
.swiper{
  height: 7rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
