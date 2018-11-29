var conn = require('../config/database')

exports.list = function(cb){
    c = conn.conn()
    c.query("select roms.*,gender.name as gendername,console.name as consolename from roms INNER JOIN gender ON roms.gender_id=gender.id INNER JOIN console ON roms.console_id=console.id ", 
    function(err, roms){
        cb(roms)
    });
}

exports.save = function(req,cb){
    c = conn.conn()
    post = {
        name: req.body.name,
        path: req.file.originalname,
        console_id:parseInt(req.body.console),
        gender_id:parseInt(req.body.gender)
    }
    c.connect(function(err){
        if (err) console.log(err)
        c.query("INSERT INTO roms SET ?",post,function(err,res){
            if(err != (undefined || '' || null)){
              console.log('Erro ao tentar gravar.'+err)
            }
            cb(true)
        })
         
        c.end()
    })

}  

exports.update = function(req,cb){
        c = conn.conn()
        post = [
            req.body.name,
            parseInt(req.body.console),
            parseInt(req.body.gender),
            req.body.id
        ]
        c.connect(function(err){
            if (err) console.log(err)
            c.query("UPDATE roms SET name=?,console_id=?,gender_id=? WHERE id = ?",post,function(err,res){
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
    c.query("SELECT * FROM roms WHERE id=?",[req.params.id],function(err, rom){
        cb(rom[0])
    });
}


exports.remove = function(req,cb){
    c = conn.conn()
    c.query("DELETE FROM roms WHERE id=?",[req.params.id],function(err, rom){
        cb(true)
    });
}
