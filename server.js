var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/test";

var Message = mongoose.model("Message", {
    msg: String
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.get("/api/message", GetMessages);

app.post("/api/message", function(req, res) {
    console.log(req.body);
    
    var message = new Message(req.body);
    message.save();

    res.status(200);
})

app.post('/auth/register', function(req, res) {
    console.log(req.body);
})

function GetMessages(req, response) {
    Message.find({}).exec(function(err, result) {
        response.send(result);
    })
}

mongoose.connect(url, function(err){
    if(!err){
        console.log("We are connected to Mongo.");
    }
})

var server = app.listen(5000, function(){
    console.log("listening on port ", server.address().port);
})