import api from "../api";

export function convertDateTime(dateTime){
    let [date, time] = dateTime.slice(0, dateTime.length-4).split('T');
    return `${date} u ${time}`;
}

export async function fetchData(path){
    api
    .get(`/api/${path}`)
    .then((res) => res.data)
    .then((data) => {
        console.log(data)
        return data;
    }).catch((err) => {
        return undefined;
    })
}