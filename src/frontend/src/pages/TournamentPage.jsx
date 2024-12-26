import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";

function TournamentPage(){

    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState([]);

    useEffect (() => {
        api
        .get(`/api/turniri/${tournamentId}/`)
        .then((res) => res.data)
        .then((data) => {
            setTournament(data);
            //console.log(data);
        })
        .catch((err) => alert(err));
    }, [])

    return(
        <>
            <Header />
            <h1>{tournament.naziv}</h1>
            <p>{tournament.opis}</p>
        </>
    );
}
export default TournamentPage