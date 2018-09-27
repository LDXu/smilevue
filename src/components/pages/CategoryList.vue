<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span='6'>
          <div id="leftNav">
            <ul>
              <li :class="{categoryActice:categoryActiceIndex==index}" v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span='18'>
          <div class="tabCategorySub">
            <van-tabs v-model="active">
              <van-tab :title="item.MALL_SUB_NAME" v-for="(item,index) in categorysub" :key="index">

              </van-tab>
            </van-tabs>
          </div>
        </van-col>
      </van-row>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serviceAPI.config.js'
  import {Toast} from 'vant'
  export default {
    data() {
      return {
        category: [],
        categorysub: [],
        categoryActiceIndex:0,
        active:0
      }
    },
    created(){
      this.getCategory();
    },
    methods: {
      getCategory() {
        axios({
          url:url.getCategoryList,
          method:'get'
        })
        .then((result) => {
          if(result.data.code==200&&result.data.message){
            this.category = result.data.message
            this.getCategorySubByCategoryId(this.category[0].ID)
          }else{
              Toast('服务器错误，获取失败')
          }
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
      },
      getCategorySubByCategoryId(categoryId){
        axios({
          url:url.getCategorySubByCategoryId,
          method:'post',
          data:{categoryId:categoryId}
        })
        .then((result) => {
          if(result.data.code==200&&result.data.message){
            this.categorysub = result.data.message
            this.active=0
          }else{
              Toast('服务器错误，获取失败')
          }
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
      },
      clickCategory(index, categoryId){
        console.log(index)
        console.log(categoryId)
        this.categoryActiceIndex=index
        this.getCategorySubByCategoryId(categoryId)
      }
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight - 46;
      document.getElementById('leftNav').style.height=winHeight+'px'
    },
  }
</script>

<style scoped>
#leftNav{
  background-color: aliceblue;
}
#leftNav ul li{
  line-height: 2rem;
  border-bottom: 1px solid #eee;
  padding: .1875rem;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice{
  background-color: white;
}
</style>
