const moment = require('moment');
require('moment-timezone');

const INPUT_UNIX_SECONDS = 'x';
const MESSAGE_TIME_FORMAT = 'ddd DD/MM/YYYY, h:mmA z';

class Message {
    constructor(template, company, guest) {
        const currentTime = moment().tz(company.timezone);
        let message = this.evaluateVariables(template.message, company, guest, currentTime);
        
        this.timestamp = currentTime.format();
        this.message = message;
    }

    evaluateVariables(template, company, guest, currentTime) {
        const timezone = company.timezone;
        const startReservation = this.getTimeFormat(guest.reservation.startTimestamp, timezone);
        const endReservation = this.getTimeFormat(guest.reservation.endTimestamp, timezone);

        let message = startReservation + ' thru ' + endReservation;

        return message;
    }

    getTimeFormat(timestamp, timezone) {
        if (timestamp && timezone) {
            return moment(timestamp, INPUT_UNIX_SECONDS).tz(timezone).format(MESSAGE_TIME_FORMAT);
        } else {
            throw new Error('Invalid timestamp or timezone in method getTimeFormat() of class Message.');
        }
    }
}

module.exports = Message;