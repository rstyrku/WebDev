//Necessary Packages
var express        = require("express"),
    partials       = require('express-partials'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    methodOverride = require('method-override'),
    Campground     = require('./models/campground'),
    Comment        = require('./models/comment'),
    User           = require('./models/user'),
    seedDB         = require('./seeds'),
    flash          = require('connect-flash');
    
var commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index.js");
    
//Seed the Database
//seedDB();
    
    
//Passport Configuration
app.use(require('express-session')({
    secret: "Paul is adorable",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Connect to Database
mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

//Necessary Uses and Settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride('_method'));
app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


//Route Specifications
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


//Server Listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Running!");
});