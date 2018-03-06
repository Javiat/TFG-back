'use strict'
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/tfg-back',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log('La base de datos esta corriendo ');
    }
});
