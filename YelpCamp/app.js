//Include all necessary packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var seed = require('./seeds.js');
var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var User = require('./models/user');

//Include all necessary routes.
var landingRouter = require('./routes/landing');
var campgroundsRouter = require('./routes/campgrounds');
var campgroundNew = require('./routes/campgroundNew');

//Set app to use express as its main framework.
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set up development necessary packages.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport Configuration
app.use(require('express-session')({
  secret: "This is the secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.postgresLocal.localStrategy));
passport.serializeUser(User.postgresLocal.serializeUser());
passport.deserializeUser(User.postgresLocal.deserializeUser());

//Routes to Use based on url location.
app.use('/', landingRouter);
app.use('/campgrounds/new', campgroundNew);
app.use('/campgrounds', campgroundsRouter);


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

//Exports App.
module.exports = app;

//Server Listener
app.listen(3000, function(){
  console.log("Server is Running");
});