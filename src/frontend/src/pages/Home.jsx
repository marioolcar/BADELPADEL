import { useEffect, useState } from "react";
import Header from "../components/Header";
import Tournament from "../components/Tournament";
import Slot from "../components/Slot";
import "../styles/pages/OwnerProfile.css"
import { sortData } from "../functions/Utility";
import api from "../api";

function Home(){

    const [tournaments, setTournaments] = useState([]);
    const [termini, setTermini] = useState([])

    function fetchReservations(){
        api
        .get("/api/termin/zauzeti/")
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            sortData(data)
            setTermini(data)
        })
    }

    useEffect(() => {
        fetchReservations()
        api
        .get("/api/prijava/user/")
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            data.forEach((item) =>{
                api
                .get(`/api/turniri/${item.turnir}/`)
                .then((res) => res.data)
                .then((data) => {
                    setTournaments((prev) => [...prev, data])
                })
            })
        })
    }, [])

    return (
        <>
            <Header />
            <p>Prijavljeni turniri</p>
            <div className="profile-tournament-container">
                {tournaments.length !== 0 ?
                tournaments.map((tournament) => (
                    <Tournament tournament={tournament} key={tournament.id} />
                )): 
                <p><b>Nema prijavljenih turnira</b></p>}
            </div>
            <hr/>
            <p>Rezervirani termini</p>
            {termini.length !== 0 ?
                termini.map((termin) => (
                    <Slot slot={termin} key={termin.id} />
                )): 
                <p><b>Nema prijavljenih turnira</b></p>}
            <div>

            </div>
            <hr/>
        </>
    );
}
export default Home;
