'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = null; //replace

/**
 * Array containing space facts.
 */
var FACTS = [
    //put in facts
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewStatementIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get aexcercise from the list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
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
    }
};