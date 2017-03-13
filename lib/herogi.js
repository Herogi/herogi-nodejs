'use strict'

var https = require('https');
var http = require('http');

var pkg = require('./../package.json');

function makeHeaders(apiKey, appSecret, globalHeaders) {
    var headers = {};
    headers['Authorization'] = 'Basic ' + new Buffer(apiKey + ':' + appSecret).toString('base64');
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers['User-Agent'] = 'herogi/' + pkg.version + ';nodejs';

    return headers;
}

function Herogi(appId, appSecret) {
    return new HerogiImpl(appId, appSecret, globalHeaders);
}

function HerogiImpl(appId, appSecret) {
    //Create global request
    this.globalRequest = getEmptyRequest({
        host : 'stream.herogi.com',
        headers: makeHeaders(appId, appSecret, globalHeaders)
    });
}