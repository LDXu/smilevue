const Router = require('koa-router')

let router = new Router()
router.get('/', async(ctx)=>{
  ctx.body='这个用户操作首页'
})

router.get('/register', async(ctx)=>{
  ctx.body='这个是注册接口'
})

module.exports = router;
