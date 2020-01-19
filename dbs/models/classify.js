const mongoose = require('mongoose');

let classify = new mongoose.Schema({
    name:String,
    id:Number
});
// 建表
module.exports = mongoose.model('classify',classify);