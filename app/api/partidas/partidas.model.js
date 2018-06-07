'use strict'

var mongoose=require('mongoose'),
    Schema=mongoose.Schema;




    var PartidaSchema=Schema({
        inicio:Date,
        fin:Date,
        puntos:Number,
        duracion:Number,
        bien_planificadas:[],
        mal_planificadas:[],
        user:{type:Schema.ObjectId,ref:'User'}
    });

    
module.exports=mongoose.model('Partidas',PartidaSchema);