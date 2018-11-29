const mysql = require('mysql');
var conn;

    exports.conn =  function(){
            
                conn = mysql.createConnection({
                    host:'sql10.freemysqlhosting.net',
                    user:'sql10267608',
                    password:'415867Cgw5',
                    database:'sql10267608',
                    port:3306
                });
            

            return  conn

        }       
