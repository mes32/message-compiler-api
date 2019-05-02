const moment = require('moment');
const momentTimezone = require('moment-timezone');

class Message {
    constructor(template, company, guest) {
        const timezone = company.timezone;
        const currentTime = moment().tz(timezone);

        this.timestamp = currentTime.format();
        this.message = template.message;
    }
}

module.exports = Message;