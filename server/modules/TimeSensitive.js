const moment = require('moment');
require('moment-timezone');

const timeRules = require('../data/time.json');
const JsonArray = require('../modules/JsonArray');

const GOODBYE_ID = 'goodbye';
const GREETING_ID = 'greeting';

const DEFAULT_GOODBYE = 'Goodbye';
const DEFAULT_GREETING = 'Hello';

class TimeSensitive {
    constructor(currentTime) {
        this.goodbye = this.getGoodbye(currentTime);
        this.greeting = this.getGreeting(currentTime);
    }

    getGoodbye(currentTime) {
        const rules = JsonArray.select(timeRules, GOODBYE_ID).rules;
        for (let rule of rules) {
            if (this.isBetween(currentTime, rule.hourStart, rule.hourEnd)) {
                return rule.value;
            }
        }
        return DEFAULT_GOODBYE;
    }

    getGreeting(currentTime) {
        const rules = JsonArray.select(timeRules, GREETING_ID).rules;
        for (let rule of rules) {
            if (this.isBetween(currentTime, rule.hourStart, rule.hourEnd)) {
                return rule.value;
            }
        }
        return DEFAULT_GREETING;
    }

    isBetween(currentTime, startHour, endHour) {
        const momentStart = moment(currentTime).hour(startHour);
        const momentEnd = moment(currentTime).hour(endHour);
        if (currentTime.isBetween(momentStart, momentEnd, 'hour', '[]')) {
            return true;
        }
        return false;
    }
}

module.exports = TimeSensitive;