'use strict'

function HerogiEvent(sessionId, eventName, scenarioNames) {

    if (typeof sessionId !== 'string' || typeof eventName !== 'string') {
        throw new Error('Strings expected for sessionId and eventName');
    }

    var _scenarioNames = typeof scenarioNames !== 'undefined' ? scenarioNames : [];

    if (!(_scenarioNames instanceof Array)) {
        throw new Error('scenarioNames should array of string');
    }

    for(var i in _scenarioNames) {
        if(typeof _scenarioNames[i] !== 'string') {
            throw new Error("All scenario names should be string -> scenarioNames array has non string on index [" +  i + "]");
        }
    }

    var params = {};

    this.addParam = function (key, value) {

        if (typeof key !== 'string' || typeof value !== 'string') {
            throw new Error('Event parameters should be string');
        }

        params[key] = value;
    };

    this.deleteParam = function (key) {
        delete params[key];
    };

    this.toJson = function () {
        var json = {
            sessionId: sessionId,
            eventName: eventName,
            scenarioNames: _scenarioNames,
            data : params
        };

        return json;
    }
}

module.exports = HerogiEvent;