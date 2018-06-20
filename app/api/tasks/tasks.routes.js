'use strict'

var express=require('express');
var TaskController=require('./tasks.controller');
var api=express.Router();

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir:'./app/res/game'});
//Operaciones post
api.post('/save-task',TaskController.saveTask);
api.post('/upload-game',md_upload,TaskController.uploadGame);
//Operaciones get
api.get('/get-task/:id',TaskController.getTask);
api.get('/get-tasks/:user',TaskController.getTasks);
api.get('/get-tasks-game/:user',TaskController.getTasksGame);
api.get('/get-file/:File',TaskController.getGame);
api.get('/get-task-game/:id/:nivel',TaskController.saveTaskJuego);
api.get('/caso-base/:id/:nivel',TaskController.caso_base);
//Operaciones put
api.put('/update-task/:id',TaskController.updateTask);
api.put('/update-event/:id',TaskController.updateEvent);

//Operaciones delete
api.delete('/delete-task/:id',TaskController.deleteTask);


module.exports=api;