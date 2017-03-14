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
        headers: makeHeaders(appId, appSecret)
    };

    this.createEvent = function(sessionId, eventName, scenarioNames) {
        return new HerogiEvent(sessionId, eventName, scenarioNames);
    };

    this.sendEvent = function (event) {
        if(typeof(event) === 'object' && event instanceof HerogiEvent) {
            console.log(event.toJson());
        } else {
            throw new Error("Event should be type of HerogiEvent");
        }
    };
}

module.exports = HerogiEventSender;