var conn = require('../config/database')

    exports.list = function(cb){
            c = conn.conn()
            c.query("select * from console", function(err, consolers){
                cb(consolers)
            });
    }