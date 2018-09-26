const koa = require('koa')
const app = new koa()

app.use(async(ctx)=>{
  ctx.body='<h1>hello koa2</h1>'
})

app.listen(3000, ()=>{
  console.log('[server] starting at prot 3000 ');
})
