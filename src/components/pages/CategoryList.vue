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

            <div id="list-div">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" v-for="item in list" :key="item">
                  {{item}}
                </div>
              </van-list>
            </div>
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
        active:0,
        loading:false,//能否刷新
        finished:false,//上拉加载是否有数据
        list:[],//商品数据
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
      },
      //上拉加载方法
      onLoad(){
        //这边不是箭头函数的话，this指向不对
        setTimeout(()=>{
          // body
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length+1)
          }
          this.loading=false;
          if(this.list.length>=40){
            this.finished=true;
          }
        }, 500);
      }
    },
    mounted() {
      let winHeight = document.documentElement.clientHeight;
      document.getElementById('leftNav').style.height=winHeight -46 +'px'
      document.getElementById('list-div').style.height=winHeight - 90 +'px'
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
#list-div{
  overflow: scroll;
}
.list-item{
  text-align: center;
  line-height: 5rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff
}
</style>
