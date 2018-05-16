'use strict'

var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var UserSchema=Schema({
    name:String,
    surname:String,
    email:String,
    password:String,
    image:String,
    partidas:Number
});
module.exports=mongoose.model('User',UserSchema);