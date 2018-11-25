const mysql = require('mysql');
var conn;

    exports.conn =  function(){
            
                conn = mysql.createConnection({
                        host:'127.0.0.1',
                        user:'root',
                        password:'database',
                        database:'adminnode',
                        port:3306
                });
            

            return  conn

        }       
