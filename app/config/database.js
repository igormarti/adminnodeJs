const mysql = require('mysql');
var conn;

    exports.conn =  function(){
            if(!conn){
                conn = mysql.createConnection({
                        host:'127.0.0.1',
                        user:'root',
                        password:'database',
                        database:'adminnode'
                });
            }

            return conn;
    }
