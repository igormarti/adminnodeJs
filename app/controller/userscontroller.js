//Requering user model
var user = require('../model/User')
//Here is getting all data requested to user home page
exports.index = function(req,res,next){
    user.list((u)=>{
        name = req.user.name.split(' ');
        res.render('users/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'users':u})
    })
}
//Redering the page to add user
exports.add = function(req,res,next){
     name = req.user.name.split(' ');
    res.render('users/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1]})
}
//This function store the user in database
exports.create = function(req,res,next){
     //Formating the name of the user
    name = req.user.name.split(' ');
     //Checking if the fields are empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('email','O campo email é obrigatório.').notEmpty()
    req.assert('email','Email inválido.').isEmail()
    req.assert('password','O campo senha é obrigatório.').notEmpty()
    req.assert('password','A senha tem que ter no mínimo 8 caracteres.').isLength({min:8})
    //Checking if had any error
    var erros = req.validationErrors();
    //If exists will display the errors in view.
    if(erros){
           res.format({
               html: function(){
                   res.status(400).render('users/add', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1]});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }
    /*If not exists errors, the registe will be stored in database
    and after display success message.*/
   user.save(req,(r)=>{
       if(r){
        res.render('users/add',{success:'Salvo com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1]})
       }
   })
}
//Redering the page to edit user
exports.edit = function(req,res,next){
    user.getOne(req,(u)=>{
        name = req.user.name.split(' ');
        res.render('users/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'user':u})
    })
}
//This function update the console in database
exports.update = function(req,res,next){
    //Formating the name of the user
    name = req.user.name.split(' ');
    //Checking if name field is empty
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('email','O campo email é obrigatório.').notEmpty()
    req.assert('email','Email inválido.').isEmail()
    req.assert('password','O campo senha é obrigatório.').notEmpty()
    req.assert('password','A senha tem que ter no mínimo 8 caracteres.').isLength({min:8})
    //Checking if had any error
    var erros = req.validationErrors();
       //If exists will display the errors in view. 
       if(erros){
           res.format({
               html: function(){
                   res.status(400).render('users/edit', {errors: erros, 'name':(!name[1])?name[0]:name[0]+' '+name[1]});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }
     /*If not exists error, the registe will be updated in database
    and after display success message.*/
    user.update(req,(r)=>{
        if(r){
            res.render('users/edit',{success:'Atualizado com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1],'user':req.body})
        }
    })
    
}
//Function to delete
exports.delete = function(req,res,next){
    user.remove(req,(r)=>{
        if(r){
            res.redirect('/users')
        }
    })
}