const router = require('koa-router')()
const Person = require('../dbs/models/person')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})
router.post('/addPerson', async function (ctx) {
  // 创建实例
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })

  let code = 0 // 状态码

  try {
    await person.save()
    code = 0
  } catch(e) {
    code = -1
  }

  // 返回状态（成功为0， 错误为-1）
  ctx.body = {
    code
  }
})
router.post('/getPerson', async function (ctx) {
  const result = await Person.findOne({
    name: ctx.request.body.name
  })

  const results = await Person.find({
    name: ctx.request.body.name
  })

  // 这里没有考虑异常，直接返回了结果
  ctx.body = {
    code: 0,
    result,
    results
  }
})


router.post('/updatePerson', async (ctx)=>{
    const result = await Person.where({
      name:ctx.request.body.name
    }).update({
      age:ctx.request.body.age
    })
    ctx.body = {
      code:0
    }
})

router.get('/removePerson', async (ctx)=>{
    const result = await Person.where({
      name:ctx.request.body.name
    }).remove()
    ctx.body = {
      code:0
    }
})
module.exports = router
