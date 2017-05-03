'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = ''; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Exercise'; //replace
var defaultWorkoutTime = 5;

function buildWorkOut(minutes) {
    vart start = Math.floor(Date.now()/1000); //current time in secs
    var finish = start + (minutes * 60);
    while (Math.floor(Date.now()/1000) != finish){
        //get excercise a lil lost
    }
}

var excercise = [
    "10 pushups",
    "15 jumping jacks",
    "10 crunches",
    "10 dead bugs",
    "15 swats",
    "15 bycles",
    "run in place for a minute",
    "10 pullups"
    "10 curls"
];


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GETPLAN');
    },
    'GETPLAN': function () {
    var minutes = this.event.request.type == 'LaunchRequest' || this.event.request.intent.slots.minutes.value === undefined ? defaultWorkoutTime : parseInt(this.event.request.intent.slots.minutes.value);
    buildWorkOut();
    this.emit(':tell', 'Here is a ' + minutes  + ' minute workout.');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Need a break? You can set a time to workout.";
        var reprompt = "How long would you like to work out?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Ok.');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Ok!');
    },
    
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try asking for a X minute workout');
    }
};