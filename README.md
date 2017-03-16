# herogi-nodejs
Herogi node.js helper library

##Install Package

The following recommended installation requires npm

```npm install --save herogi```

##Your First Event

Following is minimum needed code send an event to Herogi, you can find the full example [here](https://github.com/Herogi/herogi-nodejs/blob/master/example.js) 

```
var herogi = require('herogi');

var herogiClient = herogi("appId", "appSecret");

//Creating an event
var event = herogiClient.createEvent("user123", "eventName",["scenario1", "scenario2"]);

//Add new parameter to event
event.addParam("param1", "value1");

//Sending event
herogiClient.sendEvent(event, function(success, response){
    console.log(success);
    console.log(response);
});

```

###Sending to All Scenarios
To send all scenarios available, you can skip to scenario specifying during event creation:

```
herogiClient.createEvent("user123", "eventName",[]);

//or better

herogiClient.createEvent("user123", "eventName");

```