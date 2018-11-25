var conn = require('../config/database')

exports.list = function(cb){
    c = conn.conn()
    c.query("select roms.*,gender.name as gendername,console.name as consolename from roms INNER JOIN gender ON roms.gender_id=gender.id INNER JOIN console ON roms.console_id=console.id ", 
    function(err, roms){
        cb(roms)
    });
}

exports.save = function(req,res){
    c = conn.conn()
    post = {
        name: req.body.name,
        path: 'roms/'+req.file.originalname,
        console_id:parseInt(req.body.console),
        gender_id:parseInt(req.body.gender)
    }
    c.connect(function(err){
        if (err) console.log(err)
        c.query("INSERT INTO roms SET ?",post,function(err,res){
            if(err != (undefined || '' || null)){
              console.log('Erro ao tentar gravar.'+err)
            }
        })
         
        c.end()
    })
}