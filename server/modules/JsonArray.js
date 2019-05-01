class JsonArray {

    static select(array, id) {
        const found = array.find((element) => {
            return element.id === parseInt(id);
        });
        if (!found) {
            throw new Error('Unable to select element from JsonArray.');
        }
        return found;
    }
}

module.exports = JsonArray;