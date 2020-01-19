const mongoose = require('mongoose');

let tag = new mongoose.Schema({
    name:String,
    id:Number
});
// 建表
module.exports = mongoose.model('tag',tag);