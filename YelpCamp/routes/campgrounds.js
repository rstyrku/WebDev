//All necessary packages required
var express = require('express');
//Include necessary packages for database.
var pg = require('pg');
var pool = pg.Pool({
    user:"",
    host: "localhost",
    database: 'yelpcamp',
    password:"",
    port: "5432"
});
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

//Function to take care of any extra apostraphes. Necessary for PostGres queries.
function extraAposDB(name) {
    var split = name.split("'");
    var final = "";
    for(var i = 0; i < split.length; i++){
        final += split[i];
        if(i < split.length - 1){
            final += "''";
        }
    }
    return final;
}

//Get route to display all Campgrounds
router.get('/', function(req, res, next) {

    //Runs Query to Retrieve entries from database.
    pool.query("SELECT * FROM campgrounds", function(err, response){
        if(err){
            console.log(err);
        }
        else{
            var campgrounds = response['rows'];
            res.render('campgrounds/index',{
                campgrounds: campgrounds
            });
        }
    });
});

//Post route to add a new Campground
router.post('/', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    //Generate query to input in database
    var query = "INSERT INTO campgrounds(name, imgurl, description) VALUES ('" + extraAposDB(name) + "', '" + extraAposDB(image) +
        "', '" + extraAposDB(description) +"');";
    pool.query(query, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/campgrounds");
    });

});

//Display Full Page about campground
router.get('/:id', function(req, res, next) {
    pool.query("SELECT * FROM campgrounds WHERE name = '" +extraAposDB(req.params.id) + "'" , function(err, response){
        if(err){
            console.log(err);
        }
        else{
            var campground = response['rows'][0];
            pool.query("SELECT * FROM comments WHERE campground = '" + extraAposDB(campground.name) + "'", function(err, response){
                if(err){
                    console.log(err);
                }
                else{
                    var comments = response['rows'];
                    res.render('campgrounds/show',{
                        campground: campground,
                        comments: comments
                    });
                }
            });

        }
    });
});

//Display Form to create a new comment
router.get('/:id/comments/new', function(req, res){
    var campground = req.params.id;
    res.render('comments/new', {
        campground: campground
    });
});

//Post to submit new Comment
router.post('/:id/comments', function(req, res){
    var campground = req.params.id;
    var comment = req.body.comment;
    var author = req.body.author;
    var query = "INSERT INTO comments(comment, campground, author) VALUES ('" + extraAposDB(comment) + "','" +
        extraAposDB(campground) + "', '" + author + "')";
    //pool.query("INSERT INTO comments")
    pool.query(query, function(err){
        if (err){
            console.log(err);
        }
    });
    var url = "/campgrounds/" + campground;
    res.redirect(url);
});

module.exports = router;
