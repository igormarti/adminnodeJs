var gender = require('../model/Gender')

exports.index = function(req,res,next){
    gender.list((r)=>{
        name = req.user.name.split(' ');
        res.render('genders/index',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':r})
    })
}

exports.add = function(req,res,next){
        name = req.user.name.split(' ');
        res.render('genders/add',{'name':(!name[1])?name[0]:name[0]+' '+name[1]})
}

exports.create = function(req,res,next){
    name = req.user.name.split(' ');
    req.assert('name','O campo nome é obrigatório.').notEmpty()

    var erros = req.validationErrors();
       
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

   gender.save(req,(r)=>{
       if(r){
        res.render('genders/add', {success:'Salvo com sucesso.', 'name':(!name[1])?name[0]:name[0]+' '+name[1]});
       }
   })
}

exports.edit = function(req,res,next){
 
    gender.getOne(req,(g)=>{
        name = req.user.name.split(' ');
        res.render('genders/edit',{'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':g})
    })

}

exports.update = function(req,res,next){
    name = req.user.name.split(' ');
    req.assert('name','O campo nome é obrigatório.').notEmpty()

    var erros = req.validationErrors();
       
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


    gender.update(req,(r)=>{
        if(r){
            res.render('genders/edit',{success:'Salvo com sucesso', 'name':(!name[1])?name[0]:name[0]+' '+name[1],'gender':req.body})
        }
    })
    
}

exports.delete = function(req,res,next){
    gender.remove(req,(r)=>{
        if(r){
            res.redirect('/genders')
        }
    })
}