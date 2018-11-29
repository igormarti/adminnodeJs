var conn = require('../config/database')

    exports.list = function(cb){
            c = conn.conn()
            c.query("select * from console", function(err, consolers){
                cb(consolers)
            });
    }

    exports.save = function(req,cb){
        c = conn.conn()
        post = {
            name: req.body.name,
        }
        c.connect(function(err){
            if (err) console.log(err)
            c.query("INSERT INTO console SET ?",post,function(err,res){
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
                c.query("UPDATE console SET name=? WHERE id = ?",post,function(err,res){
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
        c.query("SELECT * FROM console WHERE id=?",[req.params.id],function(err, rom){
            cb(rom[0])
        });
    }
    
    
    exports.remove = function(req,cb){
        c = conn.conn()
        c.query("DELETE FROM console WHERE id=?",[req.params.id],function(err, rom){
            cb(true)
        });
    }
    