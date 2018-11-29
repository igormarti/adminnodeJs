const mysql = require('mysql');
var conn;

    exports.conn =  function(){
            
                conn = mysql.createConnection({
                    host:'',
                    user:'',
                    password:'',
                    database:'',
                    port:3306
                });
            

            return  conn

        }       
