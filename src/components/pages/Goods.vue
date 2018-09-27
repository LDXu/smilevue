<template>
  <div>
    商品详情
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  export default {
      data () {
        return {
          goodsId:'0032862950ca44d397e58a6fb10a3e38'
        }
      },
      created(){
        this.getInfo()
      },
      methods:{
        getInfo(){
          axios({
            url:url.getDetailGoodsInfo,
            method:'post',
            data:{
              goodsId:this.goodsId
            }
          })
          .then((result) => {
            console.log(result);
          }).catch((err) => {
            console.log(err);
          });
        }
      },
  }
</script>

<style scoped>

</style>
