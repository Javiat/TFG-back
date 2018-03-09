'use strict'

var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var TaskSchema=Schema({
    title: {
        type: String,
		required: true
    },
    description:String,
    duration:{
       type: Number,
       required:true
    },
    type:{
       type: String,
       required:true,
       enum:['solida','liquida']
    },
    user:{type:Schema.ObjectId,ref:'User'}
});

module.exports=mongoose.model('Task',TaskSchema);