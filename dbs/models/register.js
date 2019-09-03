const mongoose = require('mongoose') 
// 表结构
let registerSchema = new mongoose.Schema({
    email:String,
    name:String,
    password:String
})
// 建表
module.exports = mongoose.model('register',registerSchema)