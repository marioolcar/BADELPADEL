import api from "../api";

export function convertDateTime(dateTime){

    dateTime = new Date(dateTime)
    
    const month = `${(dateTime.getMonth()+1).toString().padStart(2, '0')}`
    const day = `${dateTime.getDate().toString().padStart(2, '0')}`
    const year = `${dateTime.getFullYear()}`
    const date = `${month}.${day}.${year}`

    const hours = `${dateTime.getHours().toString().padStart(2, '0')}`
    const minutes = `${dateTime.getMinutes().toString().padStart(2, '0')}`
    const time = `${hours}.${minutes}`

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

export function sortApplications(data){
    data.sort((a,b) => {
        if(a.status > b.status){
            return 1
        }
        else if (a.pocetak < b.pocetak){
            return -1
        }
    })
    return data
}