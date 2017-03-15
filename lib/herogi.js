'use strict'

var https = require('https');
var http = require('http');
var HerogiEvent = require('../lib/event');

var pkg = require('./../package.json');

function makeHeaders(apiKey, appSecret) {
    var headers = {};
    headers['Authorization'] = 'Basic ' + new Buffer(apiKey + ':' + appSecret).toString('base64');
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers['User-Agent'] = 'herogi/' + pkg.version + ';nodejs';

    return headers;
}

function HerogiEventSender(appId, appSecret) {
    return new HerogiEventSenderImpl(appId, appSecret);
}

function HerogiEventSenderImpl(appId, appSecret) {
    //Create global request
    this.globalRequest = {
        host : 'stream.herogi.com',
        port : 443,
        path : "/event",
        method : "POST",
        headers: makeHeaders(appId, appSecret)
    };

    this.createEvent = function(sessionId, eventName, scenarioNames) {
        return new HerogiEvent(sessionId, eventName, scenarioNames);
    };

    this.sendEvent = function (event, callback) {
        if(typeof(event) === 'object' && event instanceof HerogiEvent) {
            send(event, this.globalRequest, callback);
        } else {
            throw new Error("Event should be type of HerogiEvent");
        }
    };


    var defaultResponse = {
        code: -1,
        type: "",
        message: ""
    };

    var send = function (event, globalRequest, callback) {

        var request = JSON.parse(JSON.stringify(globalRequest));

        var body = JSON.stringify(event.toJson());
        request.headers['Content-Length'] = Buffer.byteLength(body);
        
        // Set up the request
        var postReq = https.request(request, function(res) {

            var response = "";

            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                response += chunk;
            });

            // after the call is complete, build the response object
            res.on('end', function () {
                callback(res.statusCode == 200, response);
            });
        });

        postReq.on('error', function (e) {

            var response = JSON.parse(JSON.stringify(defaultResponse));
            response.code = e.statusCode || 500;
            response.type = e.name;
            response.message = e.message;

            callback(false, response);
        });

        // post the data
        postReq.write(body);
        postReq.end();

    };
}

module.exports = HerogiEventSender;