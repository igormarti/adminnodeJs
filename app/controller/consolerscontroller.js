//Requering console model
var cons = require('../model/Console')

//Here is getting all consolers to console home page
exports.index = function(req,res,next){
    cons.list((r)=>{
        name = req.user.name.split(' ');
        res.render('consolers/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'consolers':r})
    })
}
//Redering the page to add consolers
exports.add = function(req,res,next){
        name = req.user.name.split(' ');
        res.render('consolers/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1]})
}
//This function store the consolers in database
exports.create = function(req,res,next){
    //Formating the name of the consolers
    name = req.user.name.split(' ');
    //Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view.   
    if(erros){
           res.format({
               html: function(){
                   res.status(400).render('consolers/add', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1]});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }
    /*If not exists errors, the registe will be stored in database
    and after display success message.*/
   cons.save(req,(r)=>{
       if(r){
        res.render('consolers/add', {success:'Salvo com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1]});
       }
   })
}
//Redering the page to edit consolers
exports.edit = function(req,res,next){
 
    cons.getOne(req,(c)=>{
        name = req.user.name.split(' ');
        res.render('consolers/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'consolers':c})
    })

}
//This function update the console in database
exports.update = function(req,res,next){
    //Formating the name of the console
    name = req.user.name.split(' ');
    ////Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view.     
       if(erros){
           res.format({
               html: function(){
                   res.status(400).render('consolers/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],'consolers':req.body});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }
    /*If not exists error, the registe will be updated in database
    and after display success message.*/
    cons.update(req,(r)=>{
        if(r){
            res.render('consolers/edit', {success:'Atualizado com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1],'consolers':req.body})
        }
    })
    
}
//Function to delete 
exports.delete = function(req,res,next){
    cons.remove(req,(r)=>{
        if(r){
            res.redirect('/consolers')
        }
    })
}