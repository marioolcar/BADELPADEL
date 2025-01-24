import React, { useEffect, useState } from "react";
import "../styles/components/Tournament.css"
import api from "../api";
import {convertDateTime} from "../functions/Utility.jsx";

function Tournament({ tournament }) {

    const [lokacija, setLokacija] = useState("");
    var vrijeme = "";
    var otvorenost

    if (new Date(tournament.datum_pocetka) > new Date()){
        vrijeme = `Počinje ${convertDateTime(tournament.datum_pocetka)}`
        otvorenost = "otvoren"
    } 
    else if (new Date(tournament.datum_kraja) > new Date()){
        vrijeme = `Završava ${convertDateTime(tournament.datum_kraja)}`
        otvorenost = "u tijeku"
    }
    else{
        vrijeme = `Završio ${convertDateTime(tournament.datum_kraja)}`
        otvorenost = "zatvoren"
    }
    
    useEffect(() => {
        api
        .get(`/api/tereni/${tournament.teren}/`)
        .then((res) => res.data)
        .then((data) => {
            setLokacija(`${data.lokacija_grad}, ${data.lokacija_ulica}`);
            //console.log(data);
        })
        .catch(//(err) => alert(err)
            setLokacija("Teren nije pronađen")
        );
    }, [])

    return (
        <a className="tournament-link" href={`/tournaments/${tournament.id}`}>
            <div className="tournament">
                <div className="tournament-left-block">
                    <p id="tournament-datum">{vrijeme}</p>
                    <p id="tournament-naziv">{tournament.naziv}</p>
                    <p id="tournament-lokacija">{lokacija}</p>
                </div>
                <div className="tournament-right-block">
                    <p id="tournament-cijena">{tournament.cijena_kotizacije}€</p>
                    <p id="tournament-otvorenost">{otvorenost}</p>
                </div>
            </div>
        </a>
    );
}

export default Tournament;
