const router = require('koa-router')();
const Classify = require('../dbs/models/classify');

// 列表
router.post('/classify/get',async function(ctx,next){
    let code = 200;
     await Classify.find({},{'__v':0,'_id':0},function(err,data){
        ctx.body={
            code,
            data,
        }
    })
    
})

module.exports = router;