var conn = require('../config/database')

    exports.list = function(cb){
            c = conn.conn()
            c.query("select * from gender", function(err, genders){
                cb(genders)
            });
    }
    
    exports.save = function(req,cb){
        c = conn.conn()
        post = {
            name: req.body.name,
        }
        c.connect(function(err){
            if (err) console.log(err)
            c.query("INSERT INTO gender SET ?",post,function(err,res){
                if(err != (undefined || '' || null)){
                  console.log('Erro ao tentar gravar.'+err)
                }else{
                    cb(true)
                }
            })
             
            c.end()
        })
    
    }  
    
    exports.update = function(req,cb){
            c = conn.conn()
            post = [
                req.body.name,
                req.body.id
            ]
            c.connect(function(err){
                if (err) console.log(err)
                c.query("UPDATE gender SET name=? WHERE id = ?",post,function(err,res){
                    if(err != (undefined || '' || null)){
                        console.log('Erro ao tentar gravar.'+err)
                    }else{
                        cb(true)
                    }
                })
                
                c.end()
            })
    } 
      
    exports.getOne = function(req,cb){
        c = conn.conn()
        c.query("SELECT * FROM gender WHERE id=?",[req.params.id],function(err, rom){
            cb(rom[0])
        });
    }
    
    
    exports.remove = function(req,cb){
        c = conn.conn()
        c.query("DELETE FROM gender WHERE id=?",[req.params.id],function(err, rom){
            cb(true)
        });
    }
    