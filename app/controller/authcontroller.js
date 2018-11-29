
exports.login = function(req,res,next){

    if(req.query.fail){
        res.render('login',{message:'Usuário e/ou senha incorretos!'});
    }else if(req.isAuthenticated()){
       res.redirect('/')
    }
    else{
        res.render('login',{ message: null });
    }

}

exports.logout = function(req,res,next){
    req.logout()
    res.redirect('/login')
}