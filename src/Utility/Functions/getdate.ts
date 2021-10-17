/*
    Return a timemilis from the epoch time to much easier to read date
*/

export default function getDate(currentTime :number) :string {
    const d = new Date( currentTime );
    return `${getDay(d.getDay())}, ${d.getDate()} ${getMonth(d.getMonth())}, ${d.getFullYear()}`;
}

export function getDateCurrentPHTime() :string {
    return getDate( Date.now() + (1000*60*60*13));
}

function getDay(day :number ) {
    switch(day) {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        default: return 'Sat'
    }
}

function getMonth(month :number ) {
    switch(month) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        default: return 'Dec'
    }
}
