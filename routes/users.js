const router = require('koa-router')();
const User = require('../dbs/models/user');

let code = 200;
router.post('/register', async function(ctx,next){
     console.log(ctx.request.body,'body')
    const users = new User({
        email:ctx.request.body.email,
        name:ctx.request.body.name,
        password:ctx.request.body.password,
        create_time:new Date(),
        last_time:new Date()
    })
    let arr = ['email','name','password']
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
        User.find({'name':'郭玮2'},function(err,doc){
            if(doc){
                console.log(doc)
            }
        })
    })

module.exports = router 