'use strict'

var mongoosePaginate=require('mongoose-pagination');
var path=require('path');
var fs=require('fs');
var User=require('../users/users.model');
var Task=require('./tasks.model');

function saveTask(req,res){
    var task=new Task();
    var params=req.body;
    var id=params.user;
    task.title=params.title;
    task.description=params.description;
    task.duration=params.duration;
    task.type=params.type;
    task.user=params.user;
    User.findById(id,(err,user)=>{
        if(err){
            res.status(500).send({message:'No existe un usuario con ese id al que asociar la tarea'});
        }else{
            if(!user){
                res.status(500).send({message:'No existe el usuario'});
            }else{
                task.save((err,taskStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al crear la tarea'});
                    }else{
                        if(!taskStored){
                            res.status(404).send({message:'No se ha podido crear la tarea'});
                        }else{
                            res.status(200).send({task:taskStored});
                        }
                    }
                });
            }
           
        }
      
    });
}

function getTask(req,res){
    var taskId=req.params.id;
    Task.findById(taskId).populate('user').exec((err,task)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!task){
                res.status(404).send({message:'No existe la tarea'});
            }else{
                res.status(200).send({task});
            }
        }
    });
}
function getTasks(req,res){
    var userId=req.params.user;
    var find=Task.find({user:userId}).sort('type');
    find.populate('user').exec((err,tasks)=>{
        console.log(tasks);
        if(err){
            res.status(500).send({message:'Error al hacer la consulta'});
        }else{
            if(!tasks){
                res.status(404).send({message:'No existen tareas para este usuario'});
            }else{
                res.status(200).send({tasks});
            }
        }
    });
}
function updateTask(req,res){
    var taskId=req.params.id;
    var update=req.body;
    Task.findByIdAndUpdate(taskId,update,{new:true},(err,taskUpdated)=>{
        if(err){
            res.status(500).send({message:'Error en la servidor'});

        }else{
            if(!taskId){
                res.status(404).send({message:'No se ha actualizado la tarea'});
            }else{
                res.status(200).send({task:taskUpdated});

            }
        }
    });
}

module.exports={
    saveTask,
    getTask,
    getTasks,
    updateTask
};