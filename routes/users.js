const router = require('koa-router')();
const User = require('../dbs/models/user');
const jsonwebtoken = require("jsonwebtoken");


router.post('/register', async function(ctx,next){
    let code = 200;
     console.log(ctx.request.body,'body')
    const users = new User({
        email:ctx.request.body.email,
        name:ctx.request.body.name,
        password:ctx.request.body.password,
        create_time:new Date(),
        last_time:new Date()
    })
    let arr = ['name','password']
    try{
        arr.forEach(v => {
            if(!users[v]){
                throw v
            }
        });
        try {
            await users.save(function (err,res){
                if(err){
                    console.log(err+'err')
                }else{
                    console.log(res+'res')
                }
            });
            code = 200
        }catch(error){
            code = 500
        }
        ctx.body = {
            code,
            message:'注册成功'
        }
    } catch(error){
        code = 403;
        ctx.body = {
            code,
            message:`${error}不能为空`
        }
    }
    
})
router.post('/login',async function (ctx,next){
    let code = 200;
        let user = {
            name:ctx.request.body.name,
            password:ctx.request.body.password
        }
        try {
        await    User.find(user,function(err,doc){
                if(doc){
                    if(doc.length > 0){
                         let token = jsonwebtoken.sign({
                            data:user.name,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        },'hrr')
                        ctx.body = {
                            code,
                            data:token,
                            message:'操作成功'
                        }
                    }else{
                        code = 400;
                        ctx.body = {
                            code,
                            message:'账号密码错误'
                        }
                    }
                   
                }
                else{
                    throw err
                }
            })
        } catch (error) {
            code = 500;
            ctx.body = {
                        code,
                        message:'登录失败'
                    }
        }
        
    })

module.exports = router 