const koa = require('koa')
const app = new koa()
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const cors = require('koa2-cors')
app.use(bodyParser()).use(cors())
let user = require('./appApi/user.js')
let home = require('./appApi/home.js')
//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', user.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// ;(async ()=>{
//   await connect();
//   initSchemas();
//   const User = mongoose.model('User')
//   let oneUser = new User({userName:'xubin11', passWord:'123456'})
//   oneUser.save().then(() => {
//     console.log("插入成功")
//   })
//   let user = await User.findOne({}).exec;
//   console.log('--------------------');
//   console.log(user);
//   console.log('--------------------');
// })()
app.use(async(ctx)=>{
  ctx.body='<h1>hello koa2</h1>'
})

app.listen(3000, ()=>{
  console.log('[server] starting at prot 3000 ');
})
