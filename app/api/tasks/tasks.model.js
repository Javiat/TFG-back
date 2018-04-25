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
    localizacion:String,
    start:Date,
    end:Date,
    duration: String,
    type:{
       type: String,
       enum:['solida','liquida','solida importante personal','solida importante trabajo','solida urgente personal','solida urgente trabajo','solida personal','solida trabajo','liquida importante trabajo',
        'liquida importante personal','liquida urgente trabajo','liquida urgente personal','liquida personal','liquida trabajo']
    },
    colocado:Boolean,
    color:String,
    user:{type:Schema.ObjectId,ref:'User'}
});

module.exports=mongoose.model('Task',TaskSchema);