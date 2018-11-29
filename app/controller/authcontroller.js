
/*This function check if the user is logged,
  if you are, redirect to home page, if you are not
  redirect to login page. 
*/
exports.login = function(req,res,next){
    //Checking if occurred some fail 
    if(req.query.fail){
        res.render('login',{message:'Usuário e/ou senha incorretos!'});
    //Checking if the user is logged    
    }else if(req.isAuthenticated()){
       res.redirect('/')
    }
    else{
        res.render('login',{ message: null });
    }

}
//Function to logout
exports.logout = function(req,res,next){
    req.logout()
    res.redirect('/login')
}