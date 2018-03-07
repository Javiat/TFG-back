'use strict'
var User=require('./users.model');
var bcrypt=require('bcrypt-nodejs');


function saveUser(req,res){
    var user=new User();
    var params=req.body;
    user.name=params.name;
    user.surname=params.name;
    user.email=params.email;
    user.password=params.password;
    user.image=params.image;
    if(params.email && params.password){
        User.findOne({email: params.email.toLowerCase()},function(err,User){
            if(err){
                res.status(404).send({messgae:'Error'});
            }else{
                if(User){
                    res.status(404).send({messgae:'El email ya existe'});
                }else{
                        bcrypt.hash(params.password,null,null,function(err,hash){
                        user.password=hash;
                        if(user.name !=null && user.surname!=null && user.email!=null){
                            //Guardar el usuario
                            user.save((err,userStored)=>{
                                if(err){
                                    res.status(500).send({message:'Error al guardar el usuario'});
                                }else{
                                    if(!userStored){
                                        res.status(404).send({message:'No se ha registrado el usuario'});
                                    }else{
                                        res.status(200).send({ user:userStored });
                                    }
                                }
                            });
                        }else{
                            res.status(200).send({message:'Rellena todos los campos'});
                        }
                    });
                }
               
            }
        });
        
      
    }else{
        res.status(403).send('Los campos email y contraseña son obligatorios');
    }
}

function login(req,res){
    
}
module.exports={
    saveUser
};