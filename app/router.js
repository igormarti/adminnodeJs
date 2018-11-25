var express = require('express');
var passport = require('passport')
const { check } = require('express-validator/check');
var router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'roms/')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage})

var midd = require('./config/authenticationMiddleware')
var auth = require('./controller/authcontroller')
var roms = require('./controller/romscontroller')

//Routers to controller of the auth
router.get('/login',function(req,res,next){ auth.login(req,res,next)});
router.get('/logout',function(req,res,next){auth.logout(req,res,next)})
router.get('/register',function(req,res,next){res.render('register')});
router.get('/newpassword',function(req,res,next){  res.render('newpassword')});
router.post('/register',[check('name','O campo nome é obrigatório.').isLength({min:0})
,check('email','O campo email é obrigatório').isEmail(),check('password','O campo password tem que ter no minimo 8 caracteres.').isLength({min:8})]
,function(req,res,next){auth.register(req,res,next)})
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login',failureFlash: true}));
//end router auth

/* GET home page. */
router.get('/',midd.authMiddleware,function(req, res, next) { 
    name = req.user.name.split(' ');   
    res.render('index',{name:name[0]+" "+name[1]})
});

//Router to roms
router.get('/roms',midd.authMiddleware,function(req,res,next){roms.index(req,res,next)})
router.get('/romsadd',midd.authMiddleware,function(req,res,next){roms.add(req,res,next)})
router.post('/romscreate',midd.authMiddleware,upload.single('rom'),function(req,res,next){roms.create(req,res,next)})
router.get('/romsedit/:id',midd.authMiddleware,function(req,res,next){roms.edit(req,res,next)})
router.post('/romsupdate',midd.authMiddleware,function(req,res,next){roms.update(req,res,next)})
router.get('/romsdel/:id',midd.authMiddleware,function(req,res,next){roms.delete(req,res,next)})

module.exports = router;
