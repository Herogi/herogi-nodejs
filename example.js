var herogi = require('herogi');
var herogiClient = herogi("appId", "appSecret");

var express = require('express');
var app = express();

app.get('/', function (req, res) {

    //Creating an event
    var event = herogiClient.createEvent("user123", "eventName",["scenario1", "scenario2"]);

    //Add new parameter to event
    event.addParam("param1", "value1");
    event.addParam("param2", "value2");

    //Delete parameter from event
    event.deleteParam("param1");

    event.addParam("param3", "value3");

    //Debug event data
    console.log(event.toJson());

    //Sending event
    herogiClient.sendEvent(event, function(success, response){
        console.log(success);
        console.log(response);
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    });
});

app.listen(3000, function () {
    console.log('Example event sender app, running on 3000!');
});