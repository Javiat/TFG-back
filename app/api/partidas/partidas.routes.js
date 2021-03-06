'use strict'

var express=require('express');
var PartidasController=require('./partidas.controller');
var api=express.Router();


//Operaciones post
api.post('/save-partida',PartidasController.savePartida);


//Put
api.put('/update-partida/:id',PartidasController.updatePartida);

//GET
api.get('/get-partidas/:id',PartidasController.getPartidas);
module.exports=api;

