export function convertDateTime(dateTime){
    let [date, time] = dateTime.slice(0, dateTime.length-4).split('T');
    return `${date} u ${time}`;
}