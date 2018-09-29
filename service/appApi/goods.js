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

//商品详情数据
router.post('/getDetailGoodsInfo',async(ctx)=>{
  let goodsId = ctx.request.body.goodsId
  console.log(goodsId)
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID:goodsId}).exec().then(async(result) => {
    ctx.body={
      code:200,
      message:result
    }
  }).catch((err) => {
    console.log(err);
    ctx.body={
      code:500,
      message:err
    }
  });
})

// //商品详情数据
// router.post('/getDetailGoodsInfo',async(ctx)=>{
//   try {
//     let goodsId = ctx.request.body.goodsId
//     console.log(goodsId)
//     const Goods = mongoose.model('Goods')
//     let result = await Goods.findOne({ID:goodsId}).exec()
//     ctx.body={
//       code:200,
//       message:result
//     }
//   } catch (errOR) {
//     console.log(error);
//     ctx.body={
//       code:500,
//       message:error
//     }
//   }
// })
//获取大类
router.get('/getCategoryList',async(ctx)=>{
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find({}).exec()
    ctx.body={
      code:200,
      message:result
    }
  } catch (errOR) {
    console.log(error);
    ctx.body={
      code:500,
      message:error
    }
  }
})

//获取小类
router.post('/getCategorySubList',async(ctx)=>{
  try {
    let CategoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID:CategoryId}).exec()
    ctx.body={
      code:200,
      message:result
    }
  } catch (errOR) {
    console.log(error);
    ctx.body={
      code:500,
      message:error
    }
  }
})

//商品列表
router.post('/getGoodsListByCategorySubId',async(ctx)=>{
  try {
    let CategoryId = ctx.request.body.categorySubId
    let page = ctx.request.body.page
    let num = 10//每页显示个数
    let start = (page-1)*num
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID:CategoryId}).skip(start).limit(num).exec()
    ctx.body={
      code:200,
      message:result
    }
  } catch (error) {
    console.log(error);
    ctx.body={
      code:500,
      message:error
    }
  }
})
module.exports=router;
