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

const parseDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const day = convertDay(dateObj.getDay());
    const month = convertMonth(dateObj.getMonth());
    const date = dateObj.getDate();
    const hour = convertHour(dateObj.getHours());
    const minute = dateObj.getMinutes();
    return `${day} ${month} ${date} ${year}, ${hour.hour}:${minute} ${hour.amPm}`;
}

const convertHour = (num) => {
    if (num === 0) return { hour: 12, amPm: 'AM' };
    else if (num === 12) return { hour: 12, amPm: 'PM' };
    else if (num > 12) return { hour: num - 12, amPm: 'PM' };
    else return { hour: num, amPm: 'AM' };
}

const convertDay = (num) => {
    switch (num) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            return null;
    }
}

const convertMonth = (num) => {
    switch (num) {
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return null;
    }
}

module.exports = { findItem, findIndex, parseName, parseDate };