'use strict';
var User=require('../users/users.model');
var Task=require('./tasks.model');
var moment=require('moment');
var nivel3=require('./nivel3');
function solucion_inicial (id){
        var tasks=nivel3.nivel3();
        var horas=12;
        var f=new Date();
        var diapararestar=f.getUTCDay();
        if(diapararestar==0){
           var dias1=(-6);        
        }else{
           var dias1=(diapararestar-1)*(-1);        
        }
        f.setDate(f.getDate() + dias1);
        var day_suma=f.getDate();
        var month=(f.getMonth() +1);
        var hora_inicio;
        var day_fecha=f.getDate();
        
        if(day_fecha<10){
            day_fecha="0"+day_fecha;
        }
        for(var i=0;i<tasks.length;i++){    
                    tasks[i].user=id;
                    if(tasks[i].start==null && tasks[i].end==null){
                        if(tasks[i].duration<=horas){
                            if(i==0){
                                hora_inicio=9;
                                var fecha=f.getFullYear() + "-0" + month + "-" + day_fecha+"T0"+hora_inicio;
                                tasks[i].start=fecha;
                                hora_inicio+=tasks[i].duration;
                                var fecha=f.getFullYear() + "-0" + month + "-"  +day_fecha+"T"+hora_inicio;
                                tasks[i].end=fecha;
                                horas=horas-tasks[i].duration;
                            }else{
                                var fecha=f.getFullYear() + "-0" + month + "-" + day_fecha+"T"+hora_inicio;
                                tasks[i].start=fecha;
                                hora_inicio+=tasks[i].duration;
                                var fecha=f.getFullYear() + "-0" + month + "-" + day_fecha+"T"+hora_inicio;
                                tasks[i].end=fecha;
                                horas=horas-tasks[i].duration;
                            }
                            
                        }else{
                            horas=12;
                            hora_inicio=9;
                            day_suma=(day_suma+1);
                            if(day_fecha==30 && (month==2 || month==4 || month==6 || month==9 || month==11)){
                                day_suma=1;
                            }else if(day_fecha==31 && (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)){
                                day_suma=1;
                                month=month+1;
                                console.log('entro');
                            }
                            if(day_suma<10){
                                day_fecha="0"+day_suma;
                                
                            }else{
                                day_fecha=day_suma;
                            }
                            var fecha=f.getFullYear() + "-0" + month + "-" +day_fecha+"T0"+hora_inicio;
                            tasks[i].start=fecha;
                            hora_inicio+=tasks[i].duration;
                            var fecha=f.getFullYear() + "-0" + month + "-" +day_fecha+"T"+hora_inicio;
                            tasks[i].end=fecha;
                            horas=horas-tasks[i].duration;
                        }
                    
                    }
                    save(tasks[i]);
        }
        return tasks;
}
function caso_base(id){
    var tasks=nivel3.nivel3();
    var horas=12;
        var f=new Date();
        var diapararestar=f.getUTCDay();
        if(diapararestar==0){
           var dias1=(-6);        
        }else{
           var dias1=(diapararestar-1)*(-1);        
        }
        f.setDate(f.getDate() + dias1);
        var day_suma=f.getDate();
        var month=(f.getMonth() +1);
        var hora_inicio;
        var day_fecha=f.getDate();
        
        if(day_fecha<10){
            day_fecha="0"+day_fecha;
        }
    for(var i=0;i<tasks.length;i++){
        tasks[i].user=id;
        if( tasks[i].start==null && tasks[i].end==null && (tasks[i].type=='solida importante trabajo' || tasks[i].type=='solida importante personal' || tasks[i].type=='solida urgente trabajo' || tasks[i].type=='solida urgente personal'
            || tasks[i].type=='solida trabajo' || tasks[i].type=='solida personal')){
                
                
                    
                        hora_inicio=9;
                        var fecha=f.getFullYear() + "-0" + month + "-" + day_fecha+"T0"+hora_inicio;
                        tasks[i].start=fecha;
                        hora_inicio+=tasks[i].duration;
                        var fecha=f.getFullYear() + "-0" + month + "-"  +day_fecha+"T"+hora_inicio;
                        tasks[i].end=fecha;
                        horas=horas-tasks[i].duration;
                        day_suma=(day_suma+1);
                        if(day_fecha==30 && (month==2 || month==4 || month==6 || month==9 || month==11)){
                        day_suma=1;
                        }else if(day_fecha==31 && (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)){
                        day_suma=1;
                        month=month+1;
                        console.log('entro');
                        }
                        if(day_suma<10){
                            day_fecha="0"+day_suma;
                        
                        }else{
                        day_fecha=day_suma;
                        }
                    
               
                console.log(tasks[i]);

        }
        
        save(tasks[i]);
    }
    return tasks;
}
function save(tarea){
    var task=new Task();
    var params=tarea;
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
    task.duration=params.duration;
    task.type=params.type;
    task.user=params.user; 
    User.findById(id,(err,user)=>{
        if(err){
            console.log({message:'No existe un usuario con ese id al que asociar la tarea'});
        }else{
            if(!user){
                console.log({message:'No existe el usuario'});
            }else{
                    task.save((err,taskStored)=>{    
                        if(err){
                            console.log({message:'Error al crear la tarea'});
                        }else{
                            if(!taskStored){
                               console.log({message:'No se ha podido crear la tarea'});
                            }else{
                                //console.log(taskStored);             
                            }
                        }
                    });
            }
           
        }
      
    });
}
module.exports={
  solucion_inicial,
  caso_base
};