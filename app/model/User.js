var conn = require('../config/database')
const bcrypt = require('bcrypt');

exports.list = function(cb){
    c = conn.conn()
    c.query("select * FROM users", 
    function(err, users){
        cb(users)
    });
}

exports.save = function(req,cb){
    //encrypting password
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err) throw err;

          if(hash){
                c = conn.conn();
                var post = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                }

                c.connect(function(err){
                  if (err) console.log(err)
                  c.query("INSERT INTO users SET ?",post,function(err,res){
                      if(err != (undefined || '' || null)){
                        console.log('Erro ao tentar gravar.')
                      }else{
                        cb(true)
                      }
                  })
                   
                  c.end()
                })

                
          }

    })

}  

exports.update = function(req,cb){
    console.log(req.body)
    //encrypting password
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err) throw err;

          if(hash){
                c = conn.conn();
                var post = [
                    req.body.name,
                    req.body.email,
                    hash,
                    req.body.id
                ]

                c.connect(function(err){
                  if (err) console.log(err)
                  c.query("UPDATE users SET name=?,email=?,password=? WHERE id=?",post,function(err,res){
                      if(err != (undefined || '' || null)){
                        console.log(err)
                      }else{
                          console.log('user:')
                        cb(true)
                      }
                  })
                   
                  c.end()
                })

                
          }

    })
} 
  
exports.getOne = function(req,cb){
    c = conn.conn()
    c.query("SELECT * FROM users WHERE id=?",[req.params.id],function(err, rom){
        cb(rom[0])
    });
}


exports.remove = function(req,cb){
    c = conn.conn()
    c.query("DELETE FROM users WHERE id=?",[req.params.id],function(err, rom){
        cb(true)
    });
}
