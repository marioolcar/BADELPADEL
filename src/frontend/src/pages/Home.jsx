import { useEffect, useState } from "react";
import Header from "../components/Header";
import Tournament from "../components/Tournament";
import "../styles/pages/OwnerProfile.css"
import api from "../api";

function Home(){

    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
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
                {tournaments.map((tournament) => (
                    <Tournament tournament={tournament} key={tournament.id} />
                ))}
            </div>
            <hr/>
            <p>Rezervirani termini</p>
            <div>

            </div>
            <hr/>
        </>
    );
}
export default Home;
