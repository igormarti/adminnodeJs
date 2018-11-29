var rom = require('../model/Rom')
var conso = require('../model/Console')
var gender = require('../model/Gender')
const multer = require('multer')


exports.index = function(req,res,next){
    rom.list((r)=>{
        res.render('roms/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'roms':r})
    })
}

exports.add = function(req,res,next){
    gender.list((g)=>{
        conso.list((c)=>{
             name = req.user.name.split(' ');
             res.render('roms/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c})
        })
    }) 
}

exports.create = function(req,res,next){

    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('rom','É obrigatório fazer opload de um arquivo zip ou 7z.').isZIP(req.file)
    req.assert('gender','O campo gênero é obrigatório.').isSelected(req.body.gender)
    req.assert('console','O campo console é obrigatório.').isSelected(req.body.console)
   
    var erros = req.validationErrors();

    if(erros){
        res.format({
            html: function(){
                gender.list((g)=>{
                 conso.list((c)=>{ 
                res.status(400).render('roms/add', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c});
                 })
                })        
            },
            json: function(){
                res.status(400).json(erros);
            }
        });
        
        return;
    }

   gender.list((g)=>{
   conso.list((c)=>{ 
   rom.save(req,(r)=>{
       if(r){
         res.render('roms/add',{'success':'Salvo com sucesso.','name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c})    
       }
   })
   })
   })
}

exports.edit = function(req,res,next){
    gender.list((g)=>{
       conso.list((c)=>{
            rom.getOne(req,(r)=>{
                res.render('roms/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],r,'genders':g,'consolers':c})
            })
       }) 
    })
}

exports.update = function(req,res,next){
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('gender','O campo gênero é obrigatório.').isSelected(req.body.gender)
    req.assert('console','O campo console é obrigatório.').isSelected(req.body.console)
   
    var erros = req.validationErrors();

    if(erros){
        res.format({
            html: function(){
                gender.list((g)=>{
                 conso.list((c)=>{ 
                res.status(400).render('roms/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c});
                 })
                })        
            },
            json: function(){
                res.status(400).json(erros);
            }
        });
        
        return;
    }

    rom.update(req,(r)=>{
        if(r){
            gender.list((g)=>{
                conso.list((c)=>{ 
               res.render('roms/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c});
                })
               })     
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