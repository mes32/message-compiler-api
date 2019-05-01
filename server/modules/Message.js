class Message {
    constructor(template, company, guest) {
        this.timestamp = 'YYYY-MM-DD @24:00:00';
        this.message = template.message;
    }
}

module.exports = Message;