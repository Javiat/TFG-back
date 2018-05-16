'use strict'

var mongoosePaginate=require('mongoose-pagination');
var path=require('path');
var fs=require('fs');
var User=require('../users/users.model');
var Task=require('./tasks.model');
var moment=require('moment');
var functions=require('./function');

function saveTaskJuego(req,res){
    var tasks= functions.solucion_inicial(req.params.id);
    res.status(200).send({tasks});
}
function caso_base(req,res){
    var tasks= functions.caso_base(req.params.id);
    res.status(200).send({tasks});
}
function saveTask(req,res){
    var task=new Task();
    var params=req.body;
    var id=params.user;
    if(params.start!=null && params.end!=null){
        var fecha_inicio=moment(params.start).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        var fecha_fin=moment(params.end).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        task.start=fecha_inicio
        task.end=fecha_fin;
        
    }else{
        task.start='';
        task.end='';
        
    }
    task.colocado=false;
    if(params.type=='liquida importante trabajo'){
        task.color='#2E6368'
      }else if(params.type=='liquida importante personal'){
        task.color='#265256'
      }else if(params.type=='liquida urgente trabajo'){
        task.color='#357379'
      }else if(params.type=='liquida urgente personal'){
        task.color='#3D838A'
      }else if(params.type=='liquida trabajo'){
        task.color='#53B4BD'
      }else if(params.type=='liquida personal'){
        task.color='#62BAC3'
      }else if(params.type=='solida importante trabajo'){
        task.color='#591D1C';
        task.colocado=true;
      } else if(params.type=='solida importante personal'){
       task.color='#6A2222';
       task.colocado=true;
      }else if(params.type=='solida urgente trabajo'){
        task.color='#8E2E2D';
        task.colocado=true;
      }else if(params.type=='solida urgente personal'){
       task.color='#9F3332';
       task.colocado=true;
      }else if(params.type=='solida trabajo'){
        task.color='#C74F4E';
        task.colocado=true;
      }else if(params.type=='solida personal'){
        task.color='#CD6160';
        task.colocado=true;
      }
    task.title=params.title;
    task.localizacion=params.localizacion;
    task.description=params.description;   
    // var totalHours = fecha_fin.diff(fecha_inicio, 'hours');
    // var totalMinutes = fecha_fin.diff(fecha_inicio, 'minutes');
    // var clearMinutes = totalMinutes % 60;
    // console.log(totalHours + " hours and " + clearMinutes + " minutes");
    // task.duration=totalHours+":"+clearMinutes;   
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
function getTasksGame(req,res){
    var userId=req.params.user;
    var find=Task.find({user:userId,description:'Agenda Presidente'}).sort('type');
    find.populate('user').exec((err,tasks)=>{
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
function getTasks(req,res){
    var userId=req.params.user;
    var find=Task.find({user:userId,description:'Agenda Personal'}).sort('type');
    find.populate('user').exec((err,tasks)=>{
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
    if(update.start!=null && update.end!=null){
        var fecha_inicio=moment(update.start).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        var fecha_fin=moment(update.end).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        update.start=fecha_inicio
        update.end=fecha_fin;
        update.colocado=true;
    }else {
        update.colocado=false;
        update.start=''
        update.end='';
    }  
    Task.findById(taskId,(err,task)=>{
            //  if(task.type=="solida"){
            //     res.status(500).send({message:'Una tarea solida no puede ser actualizada'});
            //  }else {
               
                Task.findByIdAndUpdate(task.id,update,{new:true},(err,taskUpdated)=>{
                    
                    if(err){
                        res.status(500).send({message:'Error en el servidor'});
                    }else{
                        if(!taskUpdated){
                            res.status(404).send({message:'No se ha actualizado la tarea'});
                        }else{
                           
                            res.status(200).send({task:taskUpdated});
                        }
                    }
                });
            //}  
    });
    
}
function updateEvent(req,res){
    var taskId=req.params.id;
    var update=req.body;
    if(update.start!=null && update.end!=null){
        var fecha_inicio=moment(update.start).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        var fecha_fin=moment(update.end).format("YYYY-MM-DDTHH:mm:ss.SSSS[Z]");
        update.start=fecha_inicio
        update.end=fecha_fin;
        update.colocado=true;
    }else {
        update.colocado=false;
        update.start=''
        update.end='';
    }  
   
    // var totalHours = fecha_fin.diff(fecha_inicio, 'hours');
    // var totalMinutes = fecha_fin.diff(fecha_inicio, 'minutes');
    // var clearMinutes = totalMinutes % 60;
    // console.log(totalHours + " hours and " + clearMinutes + " minutes");
    // update.duration=totalHours+":"+clearMinutes;
    Task.findByIdAndUpdate(taskId,update,{new:true},(err,taskUpdated)=>{  
        if(err){
            res.status(500).send({message:'Error en el servidor'});
       }else{
            if(!taskUpdated){
                res.status(404).send({message:'No se ha actualizado la tarea'});
            }else{
               
                res.status(200).send({task:taskUpdated});
            }
         }
    });
            
}
function deleteTask(req,res){
    var task_id=req.params.id;
    Task.findByIdAndRemove(task_id,function(err,Task){
        if(err){
            res.status(404).send({message:'Error'});
        }else{
            if(!Task){   
                res.status(404).send({message:'No existe la tarea'});
            }else{
                res.status(200).send({Task:Task});
            }
        }
    });
}
function uploadGame(req,res){
    var userId=req.params.id;
    var file_name="No subido...";
    console.log(req.files.file.name);
    if(req.files.file){
        var file_path=req.files.file.path;
        var file_split=file_path.split('\\');
        console.log(file_split);
        var file_name=file_split[3];
        var ext_split=file_name.split('\.');
        var file_ext=ext_split[1];
        if(file_ext=='json'){
            // User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdated)=>{
            //     if(!userUpdated){
            //         res.status(404).send({message:'No se ha podido actualizar el usuario'});
            //     }else{
            //         res.status(200).send({image:file_name,user:userUpdated});
            //     }
    
            // });
            res.status(200).send({file:file_name});
        }else{
            res.status(200).send({message:'Extension del archivo no valida'});
        }
    }else{
        res.status(200).send({message:'No has subido ningun json'});
    }
}
function getGame(req,res){
    var file=req.params.File;
    var path_file='./app/res/game/'+file;
    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe el fichero'});
        }
    });
}
module.exports={
    saveTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
    updateEvent,
    getTasksGame,
    uploadGame,
    getGame,
    saveTaskJuego,
    caso_base
};