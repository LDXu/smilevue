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
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab :title="item.MALL_SUB_NAME" v-for="(item,index) in categorysub" :key="index">

              </van-tab>
            </van-tabs>

            <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                    <div class="list-item-img">
                      <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                      <div class="list-item-text">
                          <div>{{item.NAME}}</div>
                          <div class="">￥{{item.ORI_PRICE|moneyFilter}}</div>
                      </div>
                  </div>
                </van-list>
              </van-pull-refresh>
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
  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    data() {
      return {
        category: [],
        categorysub: [],
        categoryActiceIndex:0,
        active:0,
        loading:false,//上拉加载刷新
        finished:false,//上拉加载是否有数据
        list:[],//商品数据
        isRefresh:false, //下拉加载
        page:1,          //商品列表的页数
        goodList:[],     //商品信息
        categorySubId:'', //商品子分类ID
        errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"'
      }
    },
    filters: {
      moneyFilter(money){
        return toMoney(money);
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
            this.categorySubId=this.categorysub[0].ID
            this.onLoad()
            // this.onClickCategorySub(0)
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
        this.page=1
        this.finished = false
        this.goodList=[]
        this.getCategorySubByCategoryId(categoryId)
      },
      //上拉加载方法
      onLoad(){
        //这边不是箭头函数的话，this指向不对
        setTimeout(()=>{

          this.categorySubId=this.categorySubId?this.categorySubId:this.categorysub[0].ID
          this.getGoodsList()
          // // body
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length+1)
          // }
          // this.loading=false;
          // if(this.list.length>=40){
          //   this.finished=true;
          // }
        }, 500);
      },
      //下拉刷新
      onRefresh(){
        setTimeout(() => {
          this.isRefresh = false;
          this.finished = false;
          this.goodList=[];
          this.page=1
          this.onLoad()
        }, 500);
      },
      getGoodsList(){
        axios({
          url:url.getGoodsListByCategorySubId,
          method:'post',
          data:{
            categorySubId:this.categorySubId,
            page:this.page
          }
        })
        .then((result) => {
          if(result.data.code==200&&result.data.message.length){
            this.page++
            this.goodList=this.goodList.concat(result.data.message)
          }else{
            this.finished = true;
          }
          this.loading=false;
          console.log(this.finished)
        }).catch((error) => {
          console.log(error)
        });
      },
      onClickCategorySub(index,title){
        this.categorySubId=this.categorysub[index].ID
        console.log(this.categorySubId)
        this.goodList=[]
        this.finished = false
        this.page=1
        this.onLoad()
      },
      goGoodsInfo(id){
        this.$router.push({name:'Goods',params:{goodsId:id}})
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

.list-item{
      display: flex;
      flex-direction: row;
      font-size:0.8rem;
      border-bottom: 1px solid #f0f0f0;
      background-color: #fff;
      padding:5px;
  }
  #list-div{
      overflow: scroll;
  }
  .list-item-img{
      flex:8;
  }
  .list-item-text{
      flex:16;
      margin-top:10px;
      margin-left:10px;
  }
</style>
