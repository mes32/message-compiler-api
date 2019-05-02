const moment = require('moment');

class Message {
    constructor(template, company, guest) {
        const currentTime = moment();


        this.timestamp = currentTime.format();
        this.message = template.message;
    }
}

module.exports = Message;