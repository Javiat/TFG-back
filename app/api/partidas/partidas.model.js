'use strict'

var mongoose=require('mongoose'),
    Schema=mongoose.Schema;




    var PartidaSchema=Schema({
        inicio:Date,
        fin:Date,
        puntos:Number,
        duracion:String,
        bien_planificadas:[],
        mal_planificadas:[],
        nivel:Number,
        user:{type:Schema.ObjectId,ref:'User'}
    });

    
module.exports=mongoose.model('Partidas',PartidaSchema);