var rom = require('../model/Rom')
var conso = require('../model/Console')
var gender = require('../model/Gender')

exports.index = function(req,res,next){
    rom.list((r)=>{
        console.log(r)
        res.render('roms/index',{'name':name[0]+' '+name[1],'roms':r})
    })
}

exports.add = function(req,res,next){
    gender.list((g)=>{
        conso.list((c)=>{
            console.log(c)
             name = req.user.name.split(' ');
             res.render('roms/add',{'name':name[0]+' '+name[1],'genders':g,'consolers':c})
        })
    }) 
}

exports.create = function(req,res,next){
   rom.save(req,res)
   res.redirect('/roms')
}