const moment = require('moment');
require('moment-timezone');

const IndexedArray = require('./IndexedArray');
const TimeSensitiveRule = require('./TimeSensitiveRule');

class TimeSensitiveElement {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.description = jsonObject.description;
        this.defaultValue = jsonObject.defaultValue;
        this.rules = TimeSensitiveRule.loadJSON(jsonObject.rules);

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class TimeSensitiveElement.`);
            }
        }
    }

    static loadJSON(jsonArray) {
        const companyArray = jsonArray.map(jsonObject => new TimeSensitiveElement(jsonObject));
        return new IndexedArray(companyArray);
    }

    get(currentTime) {
        for (let rule of this.rules) {
            if (this.isBetween(currentTime, rule.startHour, rule.endHour)) {
                return rule.value;
            }
        }
        return this.defaultValue;
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

module.exports = TimeSensitiveElement;