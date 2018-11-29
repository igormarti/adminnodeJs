var cons = require('../model/Console')

exports.index = function(req,res,next){
    cons.list((r)=>{
        res.render('consolers/index',{'name':name[0]+' '+name[1],'consolers':r})
    })
}

exports.add = function(req,res,next){
        name = req.user.name.split(' ');
        res.render('consolers/add',{'name':name[0]+' '+name[1]})
}

exports.create = function(req,res,next){
   
    req.assert('name','O campo nome é obrigatório.').notEmpty()

    var erros = req.validationErrors();
       
    if(erros){
           res.format({
               html: function(){
                   res.status(400).render('consolers/add', {errors: erros, 'name':name[0]+' '+name[1]});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }
    
   cons.save(req,(r)=>{
       if(r){
        res.render('consolers/add', {success:'Salvo com sucesso.', 'name':name[0]+' '+name[1]});
       }
   })
}

exports.edit = function(req,res,next){
 
    cons.getOne(req,(c)=>{
        res.render('consolers/edit',{'name':name[0]+' '+name[1],'consolers':c})
    })

}

exports.update = function(req,res,next){

    req.assert('name','O campo nome é obrigatório.').notEmpty()

    var erros = req.validationErrors();
       
       if(erros){
           res.format({
               html: function(){
                   res.status(400).render('consolers/edit', {errors: erros, 'name':name[0]+' '+name[1],'consolers':req.body});        
               },
               json: function(){
                   res.status(400).json(erros);
               }
           });
           
           return;
    }

    cons.update(req,(r)=>{
        if(r){
            res.render('consolers/edit', {success:'Salvo com sucesso.', 'name':name[0]+' '+name[1],'consolers':req.body})
        }
    })
    
}

exports.delete = function(req,res,next){
    cons.remove(req,(r)=>{
        if(r){
            res.redirect('/consolers')
        }
    })
}