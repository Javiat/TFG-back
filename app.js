'use strict'

var express=require('express');
var bodyParser=require('body-parser');

var app=express();

//Cargar rutas


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http


//Cargar rutas base


module.exports=app;