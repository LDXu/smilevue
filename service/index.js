const koa = require('koa')
const app = new koa()
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')
app.use(bodyParser())
app.use(cors())
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
let goods = require('./appApi/goods')
//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async ()=>{
  await connect();
  initSchemas();
})()

// app.use(async(ctx)=>{
//   ctx.body='<h1>hello koa2</h1>'
// })

app.listen(3000, ()=>{
  console.log('[server] starting at prot 3000 ');
})
