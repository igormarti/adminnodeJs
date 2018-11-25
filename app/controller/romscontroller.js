var rom = require('../model/Rom')
var conso = require('../model/Console')
var gender = require('../model/Gender')

exports.index = function(req,res,next){
    rom.list((r)=>{
        res.render('roms/index',{'name':name[0]+' '+name[1],'roms':r})
    })
}

exports.add = function(req,res,next){
    gender.list((g)=>{
        conso.list((c)=>{
             name = req.user.name.split(' ');
             res.render('roms/add',{'name':name[0]+' '+name[1],'genders':g,'consolers':c})
        })
    }) 
}

exports.create = function(req,res,next){
   rom.save(req,(r)=>{
       if(r){
        res.redirect('/roms')
       }
   })
}

exports.edit = function(req,res,next){
    gender.list((g)=>{
       conso.list((c)=>{
            rom.getOne(req,(r)=>{
                res.render('roms/edit',{'name':name[0]+' '+name[1],r,'genders':g,'consolers':c})
            })
       }) 
    })
}

exports.update = function(req,res,next){
    rom.update(req,(r)=>{
        if(r){
            res.redirect('/roms')
        }
    })
    
}

exports.delete = function(req,res,next){
    rom.remove(req,(r)=>{
        if(r){
            res.redirect('/roms')
        }
    })
}