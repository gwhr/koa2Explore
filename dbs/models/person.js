const mongoose = require('mongoose');
// 设计表结构

let presonSchema = new mongoose.Schema({
    name:String,
    age:Number
})

// 建表person
module.exports = mongoose.model('Person',presonSchema)