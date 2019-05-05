const IndexedArray = require('./IndexedArray');
const Reservation = require('./Reservation');

class Guest {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.firstName = jsonObject.firstName;
        this.lastName = jsonObject.lastName;
        this.reservation = new Reservation(jsonObject.reservation);

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class Guest.`);
            }
        }
    }

    static loadJSON(jsonArray) {
        const guestArray = jsonArray.map(jsonObject => new Guest(jsonObject));
        return new IndexedArray(guestArray);
    }
}

module.exports = Guest;