//Necessary Packages and Modules
var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require('../middleware');


//=================
//CAMPGROUND ROUTES
//=================

//INDEX: View all Campgrounds
router.get('/', function(req, res){
    //Get all Campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        //Error Handling
        if(err){
            console.log(err);
        }
        else{
            //Render Necessary File
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
    });
        }
    })
})

//NEW: Create New Campground
router.post("/", middleware.isLoggedIn, function(req, res){
    //Get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    }
    
    console.log(newCampground);
    //Create New Campground and save to Database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/campgrounds');
        }
    })
})

//CREATE: Creates a New Campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
})

//SHOW: Shows More Info About the Campground
router.get("/:id", function(req, res){
    //Find Campground with Provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {
                campground: foundCampground
            })
        }
    });
})

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect('back');
        }
        else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
})

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })
    //redirect somewhere(show page)
})

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
})

module.exports = router;