
 //Middleware to protect the private routers.
 exports.authMiddleware = function(req,res,next){
        /*
          Checking if the user is authenticated,
          if it is, the next request will be called.
        */
        if (req.isAuthenticated()) {
          return next()
        }
        //If you are not, will be redirect to login page
        res.redirect('/login')
    
 }