const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    link:{
        type: String,
        trim:true,
        required:true
    },
    desc:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports = mongoose.model('Log', logSchema);