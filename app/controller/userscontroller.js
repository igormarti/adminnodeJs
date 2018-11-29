var user = require('../model/User')

exports.index = function(req,res,next){
    user.list((u)=>{
        name = req.user.name.split(' ');
        res.render('users/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'users':u})
    })
}

exports.add = function(req,res,next){
     name = req.user.name.split(' ');
    res.render('users/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1]})
}

exports.create = function(req,res,next){
    name = req.user.name.split(' ');
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('email','O campo email é obrigatório.').notEmpty()
    req.assert('email','Email inválido.').isEmail()
    req.assert('password','O campo senha é obrigatório.').notEmpty()
    req.assert('password','A senha tem que ter no mínimo 8 caracteres.').isLength({min:8})

    var erros = req.validationErrors();
       
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

   user.save(req,(r)=>{
       if(r){
        res.render('users/add',{success:'Salvo com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1]})
       }
   })
}

exports.edit = function(req,res,next){
    user.getOne(req,(u)=>{
        name = req.user.name.split(' ');
        res.render('users/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'user':u})
    })
}

exports.update = function(req,res,next){
    name = req.user.name.split(' ');
    req.assert('name','O campo nome é obrigatório.').notEmpty()
    req.assert('email','O campo email é obrigatório.').notEmpty()
    req.assert('email','Email inválido.').isEmail()
    req.assert('password','O campo senha é obrigatório.').notEmpty()
    req.assert('password','A senha tem que ter no mínimo 8 caracteres.').isLength({min:8})

    var erros = req.validationErrors();
       
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

    user.update(req,(r)=>{
        if(r){
            res.render('users/edit',{success:'Atualizado com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1],'user':req.body})
        }
    })
    
}

exports.delete = function(req,res,next){
    user.remove(req,(r)=>{
        if(r){
            res.redirect('/users')
        }
    })
}