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

const parseName = (nameObj) => {
    const { name } = nameObj;
    const nameArr = name.split('-');
    return { first: nameArr[0], last: nameArr[1] };
}

module.exports = { findItem, findIndex, parseName };