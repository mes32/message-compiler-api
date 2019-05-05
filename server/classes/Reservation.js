class Reservation {
    constructor(jsonObject) {
        this.roomNumber = jsonObject.roomNumber;
        this.startTimestamp = jsonObject.startTimestamp;
        this.endTimestamp = jsonObject.endTimestamp;

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class Reservation.`);
            }
        }
    }
}

module.exports = Reservation;