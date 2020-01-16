// 用户
const mongoose = require('mongoose');
// 表结构
let user = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    create_time:String,
    last_time:String
})
// 建表
module.exports = mongoose.model('users',user)