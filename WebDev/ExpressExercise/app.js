var express = require('express');
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, Welcome to my Assignment!");
});

app.get("/pig", function(req, res){
    res.send("The pig says 'Oink!'");
});

app.get("/cow", function(req, res){
    res.send("The cow says 'Moo!'");
});

app.get("/dog", function(req, res){
    res.send("The dog says 'Woof! Woof!'");
});

app.get("/repeat/:phrase/:amount", function(req, res){
    var finalphrase = "";
    for(var i = 0; i < req.params.amount; i++){
        finalphrase += " " + req.params.phrase;
    }
    res.send(finalphrase);
});

app.get("*", function(req, res){
    res.send("Sorry page not found. What are you doing with your life!");
})
app.listen(3000, function(){
    console.log("Server running at localhost:3000");
});