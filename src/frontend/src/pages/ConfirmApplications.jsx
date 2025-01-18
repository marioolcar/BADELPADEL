import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import Tournament from "../components/Tournament";
import Application from "../components/Applications";

function ConfirmApplications(){

    const [turniri, setTurniri] = useState([]);
    const [prijave, setPrijave] = useState([]);


    async function getApplicationForTournament(turnir){
        api
        .get(`/api/prijava/turnir/${turnir.id}/`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setPrijave([...data])
        })
    }

    useEffect(() => {
        api
        .get("/api/turniri/vlasnik/")
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setTurniri(data)
            data.forEach((turnir) => {
                getApplicationForTournament(turnir)
            })
        })
    }, [])

    if (prijave.length === 0){
        return(
            <>
                <Header/>
                <p>Nema prijava za vaše turnire</p>
            </>
        )
    }

    return(

        <>
            <Header />
            <div className="application-container">
                {prijave.map((prijava) => (
                    (prijava.status !== "prihvaćena") ?
                    <Application prijava={prijava} turnir={turniri.find(({id}) => id === prijava.turnir)} key={prijava.id}/>
                    : null
                ))}
            </div>
        </>
    );
}
export default ConfirmApplications;