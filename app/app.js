'use strict'

var express=require('express');
var bodyParser=require('body-parser');

var app=express();

//Cargar rutas
var user_routes=require('./api/users/users.routes');
var task_routes=require('./api/tasks/tasks.routes');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http


//Cargar rutas base
app.use('/api',user_routes);
app.use('/api',task_routes);
module.exports=app;