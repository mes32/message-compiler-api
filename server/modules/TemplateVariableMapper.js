const moment = require('moment');
require('moment-timezone');

const TimeSensitive = require('../classes/TimeSensitiveElement');

const UNIX_SECONDS_FORMAT = 'x';
const MESSAGE_TIME_FORMAT = 'ddd DD/MM/YYYY, h:mmA z';

class TemplateVariableMapper {
    constructor(timeSensitiveElements, currentTime, company, guest) {
        if (timeSensitiveElements, currentTime, company, guest) {
            this.city = company.city;
            this.company = company.company;
            this.firstName = guest.firstName;
            this.goodbye = timeSensitiveElements.select('goodbye').get(currentTime);
            this.greeting = timeSensitiveElements.select('greeting').get(currentTime);
            this.lastName = guest.lastName;
            this.reservationEnd = this.getTimeFormat(guest.reservation.startTimestamp, company.timezone);
            this.reservationStart = this.getTimeFormat(guest.reservation.endTimestamp, company.timezone);
            this.roomNumber = guest.reservation.roomNumber;
            this.timezone = company.timezone;

            for (let variable in this) {
                if (this[variable] === undefined) {
                    throw new Error(`Undefined value for required variable '${variable}' in TemplateVariableMapper.`);
                }
            }
        } else {
            throw new Error('Missing input objects and therefore cannot guarentee mapping between variable names and values.');
        }
    }

    lookup(token) {
        switch (token) {
            case 'city':
                return this.city;
            case 'company':
                return this.company;
            case 'firstName':
                return this.firstName;
            case 'lastName':
                return this.lastName;
            case 'reservationEnd':
                return this.reservationEnd;
            case 'reservationStart':
                return this.reservationStart;
            case 'roomNumber':
                return this.roomNumber;
            case 'timezone':
                return this.timezone;
            case 'Time.goodbye':
                return this.goodbye;
            case 'Time.greeting':
                return this.greeting;
            default:
                throw new Error(`Unknown placeholder variable '${token}'. Unable to lookup value of placeholder.`);
        }
    }

    getTimeFormat(timestamp, timezone) {
        if (timestamp && timezone) {
            return moment(timestamp, UNIX_SECONDS_FORMAT).tz(timezone).format(MESSAGE_TIME_FORMAT);
        } else {
            throw new Error('Invalid timestamp or timezone in method getTimeFormat() of class Message.');
        }
    }
}

module.exports = TemplateVariableMapper;