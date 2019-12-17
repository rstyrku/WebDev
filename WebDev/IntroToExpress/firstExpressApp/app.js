var express = require('express');
var app = express();

// "/" => "Hi there"
app.get("/", function(req, res){
    res.send("Hi There!");
});

// "/bye" => "GoodBye"
app.get("/bye", function(req, res){
    res.send("Goodbye");
})

// "/dog" => "Meow"
app.get("/dog", function(req, res){
    res.send("Meow");
    console.log("Someone made a Request");
})

app.get("*", function(req, res){
    res.send("You are a star");
})

app.listen(3000, process.env.IP, function(){
    console.log("Server has started at localhost:" + 3000);
});