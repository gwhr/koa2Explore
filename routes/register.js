const router = require('koa-router')();
const User = require('../dbs/models/register');
router.prefix('/register');


let code = 200;

router.post('/register',async (ctx,next)=>{
    const register={
        name:ctx.request.body.name,
        email:ctx.request.body.email,
        password:ctx.request.body.password
    }
    const result = await User.find(register);
    console.log(result)
    if(result.length){
        ctx.body = {
            code: 403,
            message:'该账号已注册'
        }
        return 
    }
   const user = new User({
       name:ctx.request.body.name,
       email:ctx.request.body.email,
       password:ctx.request.body.password
   })
   let arr = ['name','email','password']
   try {
       arr.forEach(v=>{
            if(!user[v]){
                throw v;
            }
        })
        try {
            await user.save()
            code = 200;
        }catch(e){
            code = 500;
        }
        ctx.body = {
            code,
            message:'注册成功'
        }
   } catch (error) {
       code=403;
       ctx.body = {
            code,
            message:`${error}不能为空`
        }
   }
   
})

router.post('/login',async (ctx,next)=>{
    let whereMember = {
        name:ctx.request.body.name
    }
    const result = await User.find(whereMember);
    console.log(result)
    if(!result.length){
        ctx.body = {
            code:403,
            message:'登陆信息有误'
        }
        
    }else if(result[0].password == ctx.request.body.password){
        ctx.body = {
            code:200,
            message:'登陆成功'
        }
    }else{
        ctx.body = {
            code:200,
            message:'密码错误'
        }
    }
    
})

module.exports = router