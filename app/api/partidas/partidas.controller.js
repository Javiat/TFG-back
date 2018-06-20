'use strict'
var Partida=require('./partidas.model');
var moment=require('moment');

function savePartida(req,res){
    var partida=new Partida();
    var params=req.body;
    partida.duracion=params.duracion;
    partida.user=params.user;
    partida.puntos=params.puntos;
    partida.inicio=params.inicio;
    partida.fin=params.fin;
    partida.bien_planificadas=params.bien_planificadas;
    partida.mal_planificadas=params.mal_planificadas;
    partida.nivel=params.nivel;
    partida.save((err,partidaStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar la partida'});
        }else{
            if(!partidaStored){
                res.status(404).send({message:'No se ha registrado la partida'});
            }else{
                res.status(200).send({ partida:partidaStored });
            }
        }
    });                   
}

function updatePartida(req,res){
    var partidaId=req.params.id;
    var update=req.body;
    var f=new Date();
    var fecha_fin=moment(f).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
    update.fin=fecha_fin;
    console.log(update);
    Partida.findByIdAndUpdate(partidaId,update,{new:true},(err,partidaUpdated)=>{         
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(!partidaUpdated){
                res.status(404).send({message:'No se ha actualizado la partida'});
            }else{
                res.status(200).send({partida:partidaUpdated});
            }
        }
    });
}

function getPartidas(req,res){
    var userId=req.params.id;
    console.log(userId);
    var find=Partida.find({user:userId}).sort('id');
    find.populate('user').exec((err,partidas)=>{
        if(err){
            res.status(500).send({message:'Error al hacer la consulta'});
        }else{
            if(!partidas){
                res.status(404).send({message:'No existen partidas para este usuario'});
            }else{
                res.status(200).send({partidas});
                console.log(partidas.length);
            }
        }
    });
}


module.exports={
    savePartida,
    updatePartida,
    getPartidas
}
               
        
        

