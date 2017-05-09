'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = ''; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Exercise'; //replace

var defaultWorkoutTime = 5;
var baseTimeInterval = 15;
var maxExcerciseTime = 105;



/*
Builds a workouut

Example:
currentSpeech : Here are some excercises you can do 10 pushups 10 pushups 10 pushups 40 pushups 20 pushups 10 pushups

Todo: combine count result if like excercise. So 10 pushups 10 pushups. = 30 pushups


*/
function buildWorkOut(minutes) {
   var secondsLeft = (minutes * 60);
   var excerciseSpeech = "Ok, Here are some exercises you can do. ";
    while (secondsLeft > 0 ){
        var currentExcerciseTime = getExcerciseForTime(secondsLeft);
        var list = excerciseTimes[currentExcerciseTime].list;
        var excercise = list[getRandomInt(0,list.length-1)*1];
        excerciseSpeech += excercise + ". ";
        secondsLeft = secondsLeft - currentExcerciseTime;

    }
    return excerciseSpeech;
}

/*
Gets an excercise given the number of seconds. The excerciseTimes object has a maxTime of 150 seconds 2.5 seconds.
Returns (30, 45, 60, 90, 105). Example after calling this method with 5 minutes in the loop above possible output
could be:

*/
function getExcerciseForTime(seconds) {
    return Math.min((getRandomInt(1, seconds / baseTimeInterval) * baseTimeInterval), (getRandomInt(1, maxExcerciseTime / baseTimeInterval) * baseTimeInterval));
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
This object contains a list of excercises for a given number of seconds. Each group of seconds
can have an array of excercises. You can then find a random in each group using getRandomInt(1. 30.length)

Ex: 30: {["10 Pushups", "30 Situps"]}


*/
var excerciseTimes = {
    15: {list: ["15 second plank"]},
    30: {list: ["10 pushups"]},
    40: {list: ["10 second plank", "10 pushups"]},
    50: {list: ["10 pushups", "20 second plank"]},
    60: {list: ["30 second plank", "10 pushups"]},
    90: {list: ["10 second plank", "10 pushups", "10 jumping jacks", "10 crunches"]},
    120: {list: ["10 pushups", "20 second plank", "20 jumping jacks", "20 crunches"]}, 
    150: {list: ["30 second plank", "10 pushups", "30 jumping jacks", "30 crunches"]},
};

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
    var workout = buildWorkOut(minutes);
    this.emit(':tell', workout);
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
        this.emit(':ask', 'Sorry, I didn\'t get that. Try asking for a 5 minute workout');
    }
};
