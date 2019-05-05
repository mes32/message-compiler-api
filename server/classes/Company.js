const IndexedArray = require('./IndexedArray');

class Company {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.company = jsonObject.company;
        this.city = jsonObject.city;
        this.timezone = jsonObject.timezone;

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class Company.`);
            }
        }
    }

    static loadJSON(jsonArray) {
        const companyArray = jsonArray.map(jsonObject => new Company(jsonObject));
        return new IndexedArray(companyArray);
    }
}

module.exports = Company;