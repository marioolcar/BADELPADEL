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

export function sortData(data){
    data.sort((a,b) => {
        if(a.pocetak > b.pocetak){
            return 1
        }
        else if (a.pocetak < b.pocetak){
            return -1
        }
    })
    return data
}