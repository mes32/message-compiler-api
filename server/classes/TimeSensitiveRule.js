const IndexedArray = require('./IndexedArray');

class TimeSensitiveRule {
    constructor(jsonObject) {
        this.value = jsonObject.value;
        this.startHour = jsonObject.startHour;
        this.endHour = jsonObject.endHour;

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class TimeSensitiveRule.`);
            }
        }
    }

    static loadJSON(jsonArray) {
        const companyArray = jsonArray.map(jsonObject => new TimeSensitiveRule(jsonObject));
        return new IndexedArray(companyArray);
    }
}

module.exports = TimeSensitiveRule;