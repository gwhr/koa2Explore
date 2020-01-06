const router = require('koa-router')();
const User = require('../dbs/models/user');
const Article = require('../dbs/models/article');

let code = 200;
router.post('/article/add',async function(ctx,next){
    const article = new Article({
        title:ctx.request.body.title,
        tag:ctx.request.body.tag,
        classify:ctx.request.body.classify,
        content:ctx.request.body.content,
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
router.post('/article/list',async function(ctx,next){
    const article = {
        title:ctx.request.body.title || null,
        tag:ctx.request.body.tag || null,
        classify:ctx.request.body.classify || null,
        content:ctx.request.body.content || null,
    }
    let data = await Article.find({"tag":ctx.request.body.tag},function(err,data){
        console.log(article)
        ctx.body={
            code,
            data,
            article,
        }
    })
    
})
module.exports = router;