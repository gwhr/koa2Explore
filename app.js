const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const article = require('./routes/article')
const pv = require('./middleware/koa-pv')
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')
const jwt = require("koa-jwt");//koa-jwt用来检测token
const cors = require('koa2-cors')//设置跨域
// const koaBody = require('koa-body');//设置请求
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(pv())
app.use(json())
app.use(logger())
app.use(cors())
// app.use(koaBody())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// jwt验证
app.use(jwt({secret: "hrr"}).unless({ path: [/^\/login/,/\/get$/] }));
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// 链接数据库
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser: true
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
