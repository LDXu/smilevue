<template>
  <div>
    <swiper>
      <swiper-slide class="swiper-slider" v-for="(item, index) in slide" :key="index">
        <div>
          slide {{item}}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data () {
      return {
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
