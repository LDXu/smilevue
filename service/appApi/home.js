const Router = require('koa-router')

let router = new Router()
router.get('/', async(ctx)=>{
  ctx.body='这个首页j接口'
})

module.exports = router;
