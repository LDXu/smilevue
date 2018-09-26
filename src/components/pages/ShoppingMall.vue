<!--  -->
<template>
  <div>

    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="70%" class="location-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">
            查找
          </van-button>
        </van-col>
      </van-row>
    </div>
    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay='1000'>
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!-- adBnner -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>

    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.name}}</div>
              <div>${{item.price}}(${{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- <swiperDefault></swiperDefault> -->
    <!-- <swiperDefault2></swiperDefault2> -->
    <!-- <swiperDefault3></swiperDefault3> -->
    <!-- <swiperText></swiperText> -->

    <!-- 楼层 -->
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floor1_0.image" width="100%">
        </div>
        <div>
            <div class="floor-two">
              <img :src="floor1_1.image" width="100%">
            </div>
            <div>
              <img :src="floor1_2.image" width="100%">
            </div>
        </div>
      </div>

       <div class="floor-rule">
          <div v-for="(item, index) in floor1.slice(3)" :key="index">
            <img :src="item.image" width="100%">
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axiso from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault.vue';
import swiperDefault2 from '../swiper/swiperDefault2.vue';
import swiperDefault3 from '../swiper/swiperDefault3.vue';
import swiperText from '../swiper/swiperText';
export default {
  data () {
    return {
      msg: 'shoppingMall',
      locationIcon:require('../../assets/images/location.png'),
      bannerPicArray:[],
      category:[],
      adBanner:'',
      recommendGoods:[],
      swiperOption:{
        slidesPerView:3
      },
      floor1:[],
      floor1_0:{},
      floor1_1:{},
      floor1_2:{},
    };
  },

  created(){
    axiso({
      url:"https://www.easy-mock.com/mock/5baa3963afd56b7fe77cc9b4/smilvue/home",
      method:'get'
    })
    .then((response) => {
      console.log(response);
      this.category = response.data.data.category;
      this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
      this.bannerPicArray = response.data.data.slides;
      this.recommendGoods = response.data.data.recommend;
      this.floor1 = response.data.data.floor1;
      this.floor1_0 = response.data.data.floor1[0];
      this.floor1_1 = response.data.data.floor1[1];
      this.floor1_2 = response.data.data.floor1[2];
    })
    .catch(error=>{
      console.log(error)
    })
  },

  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperDefault2,
    swiperDefault3,
    swiperText
  }
  // computed: {},

  // mounted: {},

  // methods: {}
}

</script>
<style scoped>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0rem;
    border-right: 0rem;
    border-bottom: 1px solid #fff;
    background-color: #e5017d;
    color:#fff
  }
  .location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
  }
  .swipe-area{
    background-color: aqua;
    clear: both;
    max-height: 8rem;
    overflow: hidden;
  }
  .type-bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .type-bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
  }
  .type-bar div img{
    width: 66px;
    height: 66px;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom: 1px solid #eee;
    color: #e5017d;
    font-size: 14px;
    padding-left: .2rem;
  }
  .recommend-body{
    border-bottom: 1px solid #eee;
  }
  .recommend-item{
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
  }
  .floor-anomaly{
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .floor-anomaly div{
    width: 10rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .floor-one{
    border-right: 1px solid #ccc;
  }
   .floor-two{
    border-bottom: 1px solid #ccc;
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
  }
</style>
