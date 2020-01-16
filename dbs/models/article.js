const mongoose = require('mongoose');

// 设计表结构
let articleSchema = new mongoose.Schema({
    title:String,
    tag:String,
    classify:String,
    content:String,
    describe:String,
    createTime:{ type: Date, default: Date.now },
    id:Number
})

// 建表
module.exports = mongoose.model('article',articleSchema)