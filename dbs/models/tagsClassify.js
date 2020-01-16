const mongoose = require("mongoose");

// 设计表结构
let tagsClassify = new mongoose.schema({
    tag:String,
    classify:String,
    id:Number,
    createTime:{ type: Timestamp, default: new Date().getTime() },
})
// 建表
module.exports = mongoose.model('tagsClassify',tagsClassify)
