var express = require("express");
var ejs = require("ejs");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs")
})

app.get("/music/:instrument", function(req, res){
    var instrument = req.params.instrument;
    res.render("instrument.ejs", {instrument: instrument});
})
app.listen(3000, function(){
    console.log("Server is running");
})