//Requering console model
var gender = require('../model/Gender')
//Here is getting all genders to genders home page
exports.index = function(req,res,next){
    gender.list((r)=>{
        name = req.user.name.split(' ');
        res.render('genders/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':r})
    })
}
//Redering the page to add genders
exports.add = function(req,res,next){
        name = req.user.name.split(' ');
        res.render('genders/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1]})
}
//This function store the genders in database
exports.create = function(req,res,next){
    //Formating the name of the user
    name = req.user.name.split(' ');
    //Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view.   
    if(erros){
           res.format({
               html: function(){
                   res.status(400).render('genders/add', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1]});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }

   /*If not exists errors, the registe will be stored in database
    and after display success message.*/ 
   gender.save(req,(r)=>{
       if(r){
        res.render('genders/add', {success:'Salvo com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1]});
       }
   })
}
//Redering the page to edit consolers
exports.edit = function(req,res,next){
 
    gender.getOne(req,(g)=>{
        name = req.user.name.split(' ');
        res.render('genders/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':g})
    })

}
//This function update the console in database
exports.update = function(req,res,next){
    //Formating the name of the user
    name = req.user.name.split(' ');
    //Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view. 
       if(erros){
           res.format({
               html: function(){
                   res.status(400).render('genders/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':req.body});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }

    /*If not exists error, the registe will be updated in database
    and after display success message.*/
    gender.update(req,(r)=>{
        if(r){
            res.render('genders/edit',{success:'Atualizado com sucesso', 'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':req.body})
        }
    })
    
}
//Function to delete 
exports.delete = function(req,res,next){
    gender.remove(req,(r)=>{
        if(r){
            res.redirect('/genders')
        }
    })
}