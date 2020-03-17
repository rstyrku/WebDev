//Necessary packages and modules
var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require('../middleware');

//===========================
//COMMENTS ROUTES
//===========================

//NEW: Form for a new Comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    //Find Campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {
                campground: campground
            });
        }
    })
    
})

//CREATE: Creates a New Comment
router.post("/", middleware.isLoggedIn, function(req, res){
    //Lookup Campground Using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //Create a new Comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    res.flash('err', 'Something Went Wrong');
                    res.redirect('back');
                }
                else{
                    //Add Username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    //Save comment
                    comment.save();
                    
                    //Connect new Comment to Campground
                    campground.comments.push(comment);
                    campground.save();
                    
                    //Redirect to Campground Show Page
                    res.flash('success', 'Successfully Added Comment');
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            })
        }
    });
    
})


//EDIT: Edit Comment Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id: req.params.id,
                comment: foundComment
            });
        }
    })
});

//Comments Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })
})

//Comments Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //Find By ID and Remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        }
        else{
            res.flash('success', 'Comment Deleted');
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})

module.exports = router;