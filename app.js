var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const session = require('express-session')
var MemoryStore = require('memorystore')(session)
var expressValidator = require('express-validator');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator({
  customValidators: {
    isZIP: function(value,file) {
      if(typeof file != "undefined"){
        var extension = (path.extname(file.filename)).toLowerCase();
        console.log(extension)
        return (extension == '.zip' || extension == '.7z');
      }else{
        return false
      }
    },
    isSelected: function(value) {
      console.log(value)
      if(parseInt(value) === 0 || isNaN(parseInt(value))){
          return false
      }else{
        return true
      }
    }
  }
}))
app.use(session({
    store: new MemoryStore({
      checkPeriod: 86400000,
      ttl: 60000*60
    }),
    secret:'paytwo2019',
    resave:false,
    saveUninitialized:false
}))
require('./auth')(passport)
app.use(passport.initialize())
app.use(passport.session())

//root router
app.use('/', require('./app/router'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
