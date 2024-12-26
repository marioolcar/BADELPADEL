import React, { useEffect, useState } from "react";
import "../styles/Tournament.css"
import api from "../api";

function Tournament({ tournament }) {

    const [lokacija, setLokacija] = useState("");

    useEffect(() => {
        api
        .get(`/api/tereni/${tournament.teren}/`)
        .then((res) => res.data)
        .then((data) => {
            setLokacija(`${data.lokacija_grad}, ${data.lokacija_ulica}`);
            //console.log(data);
        })
        .catch((err) => alert(err));
    }, [])

    return (
        <a className="tournament-link" href={`/tournaments/${tournament.id}`}>
            <div className="tournament">
                <div className="tournament-left-block">
                    <p id="tournament-datum">{tournament.datum_pocetka}</p>
                    <p id="tournament-naziv">{tournament.naziv}</p>
                    <p id="tournament-lokacija">{lokacija}</p>
                </div>
                <div className="tournament-right-block">
                    <p id="tournament-cijena">{tournament.cijena_kotizacije}€</p>
                    <p id="tournament-otvorenost">{tournament.otvorenost}</p>
                </div>
            </div>
        </a>
    );
}

export default Tournament;
