const router = require('koa-router')();
const User = require('../dbs/models/user');
const Article = require('../dbs/models/article');

// 新增
router.post('/article/add',async function(ctx,next){
    let code = 200;
    let length = await Article.countDocuments()
    const article = new Article({
        title:ctx.request.body.title,
        tag:ctx.request.body.tag,
        classify:ctx.request.body.classify,
        content:ctx.request.body.content,
        id:length+1
    })
    let arr = ['title','tag','classify','content'];
    try{
        arr.forEach(v=>{
            if(!article[v]){
                throw v
            }
        })
        try{
            await article.save((error,res)=>{
                if(error){
                    console.log('err:',error)
                }else{
                    console.log('res:',res)
                }
            })
            // let data = await Article.find().sort({_id:-1}).limit(1);
            code = 200;
            ctx.body = {
                code,
                message:`添加成功`
            }
        }
        catch(error){
            code = 500;
            ctx.body = {
                code
            }
        }
    }
    catch(error){
        code = 400;
        ctx.body = {
            code,
            message:`${error}不能为空`
        }
    }
})
// 修改
router.post('/article/update',async function (ctx,next){
    let code = 200;
    const article = {
             id:ctx.request.body.id || null,
             
        }
    const updateObj = {
             title:ctx.request.body.title,
             tag:ctx.request.body.tag,
             classify:ctx.request.body.classify,
             content:ctx.request.body.content,
    }
    try {
        if(!ctx.request.body.id){
            code = 400;
            throw article
        }
        await Article.update({'id':article.id},updateObj,function(err,data){
            ctx.body={
                code,
                data,
            }
        })
    } catch (error) {
        code = 400
        ctx.body= {
            code,
            msg:'id不能为空或该数据不存在'
        }
    }
})
// 列表
router.post('/article/list/get',async function(ctx,next){
    let code = 200;
    const article = {
        title:ctx.request.body.title || null,
        tag:ctx.request.body.tag || null,
        classify:ctx.request.body.classify || null,
        content:ctx.request.body.content || null,
        page:ctx.request.body.page || 1,
        size:ctx.request.body.size || 10
    }
    let options = {
        "limit":article.size,
        "skip":((article.page-1)*article.size),
        "sort":{'_id':-1}
    }
     await Article.find({},{'__v':0,'_id':0},options,function(err,data){
        ctx.body={
            code,
            data,
            article,
        }
    })
    
})
// 详情
router.post('/article/details/get',async function(ctx,next){
    let code = 200;
    const article = {
        id:ctx.request.body.id || null
    }
    try{
        if(!article.id){
            code = 400;
            throw article
        }
        await Article.findOne({'id':article.id},{'__v':0,'_id':0},function(err,data){
            ctx.body={
                code,
                data,
            }
        })
    }catch(err){
        ctx.body= {
            code,
            msg:'id不能为空'
        }
    }
    
    
})
// 删除
router.post('/article/delete',async function(ctx,next){
    let code = 200;
    const article = {
        id:ctx.request.body.id
    }
    try{    
        if(!article.id){
            code = 400;
            throw article
        }
        await Article.remove({"id":article.id},function(err,data){
            if(data){
                ctx.body = {
                    code,
                    masg:'操作成功'
                }
            }else{
                throw article
            }
        })
    }
    catch(err){
        ctx.body= {
            code,
            msg:'id不能为空或该数据不存在'
        }
    }
    
})
module.exports = router;