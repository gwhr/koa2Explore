const router = require('koa-router')();
const Tag = require('../dbs/models/tag');

// 列表
router.post('/tag/get',async function(ctx,next){
    let code = 200;
     await Tag.find({},{'__v':0,'_id':0},function(err,data){
        ctx.body={
            code,
            data,
        }
    })
    
})


module.exports = router;