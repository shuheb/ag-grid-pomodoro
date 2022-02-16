/**
 * Serialises a Date to a string of format `HH:mm am/pm`.
 * from https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
 * @param date The date to serialise.
 */
export function serialiseDate(date) {
    let serialised = [date.getHours(), padStartWithZeros(date.getMinutes(), 2)].join(':');
    serialised += date.getHours() >= 12 ? 'pm' : 'am';

    return serialised;
}

function padStartWithZeros(value, totalStringSize) {
    return value.toString().padStart(totalStringSize, '0');
}

export function formatSecondsIntoMinutesAndSeconds(value) {
    const seconds = padStartWithZeros(value % 60, 2);
    const minutes = padStartWithZeros(Math.floor(value / 60), 2);
    return [minutes, seconds].join(':');
}