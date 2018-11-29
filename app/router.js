//Here is load the modules required to manipulate the routers.
var express = require('express');
var passport = require('passport')
var router = express.Router();
var path = require('path')
/*Requiring the modules of controller and the middleware
to protect the private routers*/
var midd = require('./config/authenticationMiddleware')
var auth = require('./controller/authcontroller')
var roms = require('./controller/romscontroller')
var genders = require('./controller/genderscontroller')
var consolers = require('./controller/consolerscontroller')
var users = require('./controller/userscontroller')
//requiring module to upload of file.
const multer = require('multer')
//Setting the mode to store the file
const storage = multer.diskStorage(
    
       {
            destination:(req,file,cb)=>{
                if(file){
                cb(null,'roms/')
                }
            },
            filename: (req,file,cb)=>{
                if(file){
                cb(null,file.originalname)
                }
            },
        }
    
)
//Setting the mode of how will storage the file
const upload = multer({storage,limits:{fileSize:Infinity}})


//Routers to controller of the auth
router.get('/login',function(req,res,next){ auth.login(req,res,next)});
router.get('/logout',function(req,res,next){auth.logout(req,res,next)})
router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login?fail=true',failureFlash: true}));
//end router auth

/* GET home page. */
router.get('/',midd.authMiddleware,function(req, res, next) { 
    name = req.user.name.split(' ');   
    res.render('index',{name:(!name[1])?name[0]:name[0]+' '+name[1]})
});

//Routers to roms
router.get('/roms',midd.authMiddleware,function(req,res,next){roms.index(req,res,next)})
router.get('/romsadd',midd.authMiddleware,function(req,res,next){roms.add(req,res,next)})
router.post('/romscreate',midd.authMiddleware,upload.single('rom'),function(req,res,next){roms.create(req,res,next)})
router.get('/romsedit/:id',midd.authMiddleware,function(req,res,next){roms.edit(req,res,next)})
router.post('/romsupdate',midd.authMiddleware,function(req,res,next){roms.update(req,res,next)})
router.get('/romsdel/:id',midd.authMiddleware,function(req,res,next){roms.delete(req,res,next)})

//Routers to genders
router.get('/genders',midd.authMiddleware,function(req,res,next){genders.index(req,res,next)})
router.get('/gendersadd',midd.authMiddleware,function(req,res,next){genders.add(req,res,next)})
router.post('/genderscreate',midd.authMiddleware,function(req,res,next){genders.create(req,res,next)})
router.get('/gendersedit/:id',midd.authMiddleware,function(req,res,next){genders.edit(req,res,next)})
router.post('/gendersupdate',midd.authMiddleware,function(req,res,next){genders.update(req,res,next)})
router.get('/gendersdel/:id',midd.authMiddleware,function(req,res,next){genders.delete(req,res,next)})

//Routers to consolers
router.get('/consolers',midd.authMiddleware,function(req,res,next){consolers.index(req,res,next)})
router.get('/consolersadd',midd.authMiddleware,function(req,res,next){consolers.add(req,res,next)})
router.post('/consolerscreate',midd.authMiddleware,function(req,res,next){consolers.create(req,res,next)})
router.get('/consolersedit/:id',midd.authMiddleware,function(req,res,next){consolers.edit(req,res,next)})
router.post('/consolersupdate',midd.authMiddleware,function(req,res,next){consolers.update(req,res,next)})
router.get('/consolersdel/:id',midd.authMiddleware,function(req,res,next){consolers.delete(req,res,next)})

//Routers to users
router.get('/users',midd.authMiddleware,function(req,res,next){users.index(req,res,next)})
router.get('/usersadd',midd.authMiddleware,function(req,res,next){users.add(req,res,next)})
router.post('/userscreate',function(req,res,next){users.create(req,res,next)})
router.get('/usersedit/:id',midd.authMiddleware,function(req,res,next){users.edit(req,res,next)})
router.post('/usersupdate',midd.authMiddleware,function(req,res,next){users.update(req,res,next)})
router.get('/usersdel/:id',midd.authMiddleware,function(req,res,next){users.delete(req,res,next)})

//Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /zip/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(true);
    } else {
        cb(false);
    }
    }

module.exports = router;
