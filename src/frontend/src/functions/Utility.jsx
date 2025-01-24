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

export function sortData(data, field){

    data.sort((a,b) => {

        if(a[field] > b[field]){
            return 1
        }
        else if (a[field] < b[field]){
            return -1
        }
    })
    return data
}

export function checkOtvorenost(tournament){

    if(new Date(tournament.datum_pocetka) > new  Date()){
        return "Otvoren"
    }
    else if(new Date(tournament.datum_kraja) > new Date()){
        return "U tijeku"
    }
    else{
        return "Zatvoren"
    }
}

export function roundToHour(date) {
        //get current date and round up to the hour
        date.setMinutes(date.getMinutes()+60)
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date
}