'use strict'

var express=require('express');
var UserController=require('./users.controller');
var md_auth=require('./authenticated');
var api=express.Router();


api.post('/save-user',UserController.saveUser);
api.delete('/delete-user/:id',UserController.deleteUser);
api.post('/login-user',UserController.loginUser);
module.exports=api;