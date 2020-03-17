var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "Clouds Rest",
        image: "https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20-640x427.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://i.pinimg.com/originals/fa/17/82/fa1782af0ecc34b7849c8a24f8385c8f.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Canyon_de_Chelly_from_the_canyon_floor.jpg",
        description: "blah blah blah"
    }
    ]
    
function seedDB(){
    
    //Remove all Campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed Campgrounds!");
            
            Comment.deleteMany({}, function(err){
                if(err){
                    console.log(err);
                }
                
                //Add Few Campgrounds
                data.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("added a campground");
                            Comment.create({
                                text: "This place is great, but I wish that there was internet.",
                                author: "Homer"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new Comment");
                                    }
                                })
                        }
                    })
                })
            })
            
        }
    })
}

module.exports = seedDB;