const conn = require('../config/database')
const bcrypt = require('bcrypt');
const validationResult = require('express-validator/check');

exports.login = function(req,res,next){

    if(req.query.fail){
        res.render('login',{message:'Usuário e/ou senha incorretos!'});
    }else if(req.isAuthenticated()){
       res.redirect('/')
    }
    else{
        res.render('login',{ message: null });
    }

}

exports.logout = function(req,res,next){
    req.logout()
    res.redirect('/login')
}

exports.register = function(req,res,next){

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }

    //encrypting password
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err) throw err;

          if(hash){
                c = conn.conn();
                var r  = res;
                var post = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                }

                c.connect(function(err){
                  if (err) console.log(err)
                  c.query("INSERT INTO users SET ?",post,function(err,res){
                      if(err != (undefined || '' || null)){
                        r.send('Erro ao tentar gravar.')
                      }else{
                        r.send('Gravado com sucesso.')
                      }
                  })
                   
                  c.end()
                })

                
          }

    })


}

exports.newpassword = function(req,res,next){

}