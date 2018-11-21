var express = require('express');
const conn = require('./config/database')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');
var router = express.Router();



router.get('/login',function(req,res,next){  res.render('login')});
router.get('/register',function(req,res,next){  res.render('register')});
router.get('/newpassword',function(req,res,next){  res.render('newpassword')});

router.post('/register',[check('name','O campo nome é obrigatório.').isLength({min:0})
,check('email','O campo email é obrigatório').isEmail(),check('password','O campo password tem que ter no minimo 8 caracteres.').isLength({min:8})]
,function(req,res,next){

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


})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
