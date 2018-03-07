'use strict'

var express=require('express');
var UserController=require('./users.controller');

var api=express.Router();


api.post('/save-user',UserController.saveUser);

module.exports=api;