var conn = require('../config/database')

    exports.list = function(cb){
            c = conn.conn()
            c.query("select * from gender", function(err, genders){
                cb(genders)
            });
    }