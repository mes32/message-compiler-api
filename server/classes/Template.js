// const IndexedArray = require('./IndexedArray');

class Template {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.description = jsonObject.description;
        this.message = jsonObject.message;

        for (let variable in this) {
            if (this[variable] === undefined) {
                throw new Error(`Undefined value for required variable '${variable}' in class Guest.`);
            }
        }
    }

    static loadJSON(jsonArray) {
        const templateArray = jsonArray.map(jsonObject => new Template(jsonObject));
        // return new IndexedArray(templateArray);
    }
}

module.exports = Template;