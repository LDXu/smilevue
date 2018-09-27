const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insterAllGoodsInfo',async(ctx)=>{
  //这边是绝对路径！！！
  fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
    if(err){
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      return;
    }
    data=JSON.parse(data);
    let saveCount=0;
    const Goods = mongoose.model('Goods')
    data.map((value,index)=>{
      console.log(value);
      let newGoods = new Goods(value);
      newGoods.save().then(()=>{
        saveCount++;
        console.log('插入成功')
      }).catch(error=>{
        console.log(error)
      })
    })
  })
  ctx.body="开启导入商品数据"
})

router.get('/insterAllCategory',async(ctx)=>{
  //这边是绝对路径！！！
  fs.readFile('./data_json/category.json','utf8',(err,data)=>{
    if(err){
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      return;
    }
    data=JSON.parse(data);
    let saveCount=0;
    const Category = mongoose.model('Category')
    data.RECORDS.map((value,index)=>{
      console.log(value);
      let newCategory = new Category(value);
      newCategory.save().then(()=>{
        saveCount++;
        console.log('插入成功')
      }).catch(error=>{
        console.log(error)
      })
    })
  })
  ctx.body="开启导入分类数据"
})

router.get('/insterCategorysub',async(ctx)=>{
  //这边是绝对路径！！！
  fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
    if(err){
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      return;
    }
    data=JSON.parse(data);
    let saveCount=0;
    const Categorysub = mongoose.model('CategorySub')
    data.RECORDS.map((value,index)=>{
      console.log(value);
      let newCategorysub = new Categorysub(value);
      newCategorysub.save().then(()=>{
        saveCount++;
        console.log('插入成功')
      }).catch(error=>{
        console.log(error)
      })
    })
  })
  ctx.body="开启导入子类分类数据"
})

module.exports=router;
