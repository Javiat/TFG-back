'use strict'

var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var moment=require('moment');
var TaskSchema=Schema({
    title: {
        type: String,
		required: true
    },
    description:String,
    fecha_inicio:String,
    fecha_fin:String,
    duration: String,
    type:{
       type: String,
       required:true,
       enum:['solida','liquida']
    },
    user:{type:Schema.ObjectId,ref:'User'}
});

module.exports=mongoose.model('Task',TaskSchema);