//Requering models
var rom = require('../model/Rom')
var conso = require('../model/Console')
var gender = require('../model/Gender')

//Here is getting all data requested to roms home page
exports.index = function(req,res,next){
    rom.list((r)=>{
        name = req.user.name.split(' ');
        res.render('roms/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'roms':r})
    })
}
//Redering the page to add roms
exports.add = function(req,res,next){
    gender.list((g)=>{
        conso.list((c)=>{
             name = req.user.name.split(' ');
             res.render('roms/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'genders':g,'consolers':c})
        })
    }) 
}
//This function store the rom in database
exports.create = function(req,res,next){
    //Formating the name of the user
    name = req.user.name.split(' ');
     //Checking if the fields are empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('rom','É obrigatório fazer opload de um arquivo zip ou 7z.').isZIP(req.file)
    req.assert('gender','O campo gênero é obrigatório.').isSelected(req.body.gender)
    req.assert('console','O campo console é obrigatório.').isSelected(req.body.console)
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view. 
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

   /*If not exists errors, the registe will be stored in database
    and after display success message.*/ 
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
//Redering the page to edit rom
exports.edit = function(req,res,next){
    gender.list((g)=>{
       conso.list((c)=>{
            rom.getOne(req,(r)=>{
                res.render('roms/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],r,'genders':g,'consolers':c})
            })
       }) 
    })
}
//This function update the console in database
exports.update = function(req,res,next){
    //Formating the name of the user
    name = req.user.name.split(' ');
    //Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('gender','O campo gênero é obrigatório.').isSelected(req.body.gender)
    req.assert('console','O campo console é obrigatório.').isSelected(req.body.console)
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view. 
    if(erros){
        res.format({
            html: function(){
                gender.list((g)=>{
                 conso.list((c)=>{ 
                res.status(400).render('roms/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],
                r:{'name':req.body.name,'id':req.body.id,'gender_id':req.body.gender,'console_id':req.body.console}
                ,'genders':g,'consolers':c});
                 })
                })        
            },
            json: function(){
                res.status(400).json(erros);
            }
        });
        
        return;
    }
     /*If not exists error, the registe will be updated in database
    and after display success message.*/
    rom.update(req,(r)=>{
        if(r){
            gender.list((g)=>{
               conso.list((c)=>{ 
               res.render('roms/edit', {success:'Atualizado com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1],
               r:{'name':req.body.name,'id':req.body.id,'gender_id':req.body.gender,'console_id':req.body.console}
               ,'genders':g,'consolers':c});
                })
            })     
        }
    })
    
}
//Function to delete
exports.delete = function(req,res,next){
    rom.remove(req,(r)=>{
        if(r){
            res.redirect('/roms')
        }
    })
}