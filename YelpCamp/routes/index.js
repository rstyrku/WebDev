//Necessary packages and modules
var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");

//Root Get Route
router.get('/', function(req, res){
    res.render("landing");
})

//=====================
//AUTHENTICATION ROUTES
//=====================

//NEW: Show Register Form for new user
router.get("/register", function(req, res){
    res.render('register');
})

//CREATE: Handle Signup and Creates new User
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            res.flash('error', err.message);
            return res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.flash('success', `Welcome to YelpCamp ${user.username}`);
                res.redirect("/campgrounds");
            })
        }
    });
})

//Show Login Form
router.get("/login", function(req,res){
    res.render('login');
})

//Handle Login Logic
router.post("/login", passport.authenticate('local',
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
}));

//Logout Route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/campgrounds");
})

//Tests if a user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;