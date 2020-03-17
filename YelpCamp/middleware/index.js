var Campground = require('../models/campground');
var Comment = require('../models/comment');

//All the Middleware
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.flash('error', 'Campground Not Found');
                res.redirect('back');
            }
            else{
                
                //Does User own the Campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.flash('error', 'You Dont Have Permission to do That');
                    res.redirect('back');
                }
            }
        })
    }
    else{ 
        req.flash("error",'You Need to Be Logged In to do That');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect('back');
            }
            else{
                
                //Does User own the Comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect('error', 'You Dont Have Permission to do That');
                    res.redirect('back');
                }
            }
        })
    }
    else{ 
        res.flash('error', 'You Need to be Logged In to do That');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash('error', 'You Need to Be Logged In to do That');
        res.redirect("/login");
    }
}

module.exports = middlewareObj