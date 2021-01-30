const findItem = (id, list) => {
    for (let item of list) {
        if (item._id === id || item.id === id) return item;
    }
    return null;
}

const findIndex = (id, list) => {
    let i = 0;
    for (let item of list) {
        if (item._id === id || item.id === id) return i;
        else i += 1;
    }
    return null;
}
module.exports = { findItem, findIndex };