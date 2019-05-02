const moment = require('moment');
require('moment-timezone');

const UNIX_SECONDS_FORMAT = 'x';
const MESSAGE_TIME_FORMAT = 'ddd DD/MM/YYYY, h:mmA z';

class Message {
    constructor(template, company, guest) {
        const currentTime = moment().tz(company.timezone);
        let message = this.evaluateVariables(template.message, company, guest, currentTime);
        
        this.timestamp = currentTime.format();
        this.message = message;
    }

    evaluateVariables(template, company, guest, currentTime) {
        // These allow for special treatment of timestamp variables
        const timezone = company.timezone;
        const startReservation = this.getTimeFormat(guest.reservation.startTimestamp, timezone);
        const endReservation = this.getTimeFormat(guest.reservation.endTimestamp, timezone);

        let message = '';
        for (let i = 0; i < template.length; i++) {
            if (template[i] === '\\') {
                // This downgrades escaped variables
                // (e.g. \\${var} => ${var})
                if (i + 1 < template.length && template[i+1] === '$') {
                    message += '$';
                    i += 1;
                } else {
                    message += '\\';
                }
            } else if (template[i] === '$' && i + 1 < template.length && template[i + 1] === '{') {
                // This evaluates variables
                // (e.g. ${var} => value)

                let variableName = '';
                for (let j = i + 1; j < template.length; j++) {
                    if (template[j] === '}') {
                        variableName = template.substring(i+2, j);
                        // let variableValue;
                        // if (variableName === 'guest.reservation.startTimestamp') {
                        //     variableValue = startReservation;
                        // } else if (variableName === 'guest.reservation.endTimestamp') {
                        //     variableValue = endReservation;
                        // } else {
                        //     variableValue = [variableName];
                        // }

                        message += 'VAL'; //variableValue;
                        i += variableName.length + 2;
                        break;
                    }
                }
                if (!variableName) {
                    throw new Error('Could not evaluate variable name in method evaluateVariables() of class Message.');
                }
            } else {
                message += template[i];
            }
        }
        return message;
    }

    getTimeFormat(timestamp, timezone) {
        if (timestamp && timezone) {
            return moment(timestamp, UNIX_SECONDS_FORMAT).tz(timezone).format(MESSAGE_TIME_FORMAT);
        } else {
            throw new Error('Invalid timestamp or timezone in method getTimeFormat() of class Message.');
        }
    }
}

module.exports = Message;