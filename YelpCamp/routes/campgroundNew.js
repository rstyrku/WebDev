var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//Displays the Form for a New Campground
router.get('/', function(req, res, next) {
    res.render('campgrounds/new.ejs');
});

module.exports = router;
