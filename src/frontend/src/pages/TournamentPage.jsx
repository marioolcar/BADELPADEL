import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import { convertDateTime } from "../functions/Utility";
import FieldPageHeader from "../components/FieldPageHeader";
import TournamentBubbles from "../components/TournamentBubbles";
import "../styles/TournamentPage.css"

function TournamentPage(){

    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState([]);
    const [field, setField] = useState([]);


    function fetchFieldData(data){
        api
        .get(`/api/tereni/${data.teren}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data)
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    useEffect (() => {
        api
        .get(`/api/turniri/${tournamentId}/`)
        .then((res) => res.data)
        .then((data) => {
            data.datum_pocetka = convertDateTime(data.datum_pocetka);
            data.datum_kraja = convertDateTime(data.datum_kraja);
            setTournament(data);
            fetchFieldData(data);
            console.log(data);
        })
        .catch((err) => alert(err));
    }, [])

    return(
        <>
            <Header />
            <h1 id="tournament-name">{tournament.naziv}</h1>
            <TournamentBubbles tournament = {tournament}/>
            <FieldPageHeader field = {field} />
            <div className="tournament-info-container">
                <h2>Detaljni opis:</h2>
                <p>{tournament.opis}</p>
            </div>
            <div className="tournament-info-container">
                <h2>Nagrade:</h2>
                <p>{tournament.nagrade}</p>
            </div>
        </>
    );
}
export default TournamentPage