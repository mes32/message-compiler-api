class IndexedArray {
    constructor(array) {
        this.array = array;
    }

    select(id) {
        const found = this.array.find((element) => {
            return element.id === id;
        });
        if (!found) {
            throw new Error('Unable to select element from IndexedArray.');
        }
        return found;
    }
}

module.exports = IndexedArray;