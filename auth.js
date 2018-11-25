var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt')
var conn = require('./app/config/database')


module.exports = function(passport){


    var c = conn.conn()

    passport.serializeUser(function(user, done){

        done(null, user.id);
    
    });

    passport.deserializeUser(function(id, done){
 
        c.query("select * from users where id = "+id, function (err, user){
    
            done(err, user[0]);
    
        });
    
    });

    passport.use('local', new LocalStrategy({

        usernameField: 'email',
      
        passwordField: 'password',
      
        passReqToCallback: true //passback entire req to call back
      } , function (req, email, password, done){
      
           
            c.query("select * from users where email = ?", [email], function(err, user){
      
                    console.log(err); console.log('user:'+user);
            
                    if (err) return done(err)
            
                    if(!user.length){ return done(null, false) }

                    bcrypt.compare(password,user[0].password,function(err,isValid){

                        if(err){ return done(null,false)}
                        if(!isValid){ return done(null,false)}
                        return done(null,user[0])

                    })
      
            });
      
          }
      
    ));


}