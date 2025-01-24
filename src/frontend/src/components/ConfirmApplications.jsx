import { useEffect, useState } from "react";
import api from "../api";
import Application from "./Applications";
import { sortApplications } from "../functions/Utility";

function ConfirmApplications(){

    const [turniri, setTurniri] = useState([]);
    const [prijave, setPrijave] = useState([]);


    async function getApplicationForTournament(turnir){
        api
        .get(`/api/prijava/turnir/${turnir.id}/`)
        .then((res) => res.data)
        .then((data) => {
            //console.log(data)
            sortApplications(data)
            setPrijave(data)
        })
    }

    useEffect(() => {
        api
        .get("/api/turniri/vlasnik/")
        .then((res) => res.data)
        .then((data) => {
            //console.log(data)
            setTurniri(data)
            data.forEach((turnir) => {
                getApplicationForTournament(turnir)
            })
        })
    }, [])

    if (prijave.length === 0){
        return(
            <>
                <p>Nema prijava za vaše turnire</p>
            </>
        )
    }

    return(

        <div className="application-container">
            {prijave.map((prijava) => (
                <Application prijava={prijava} turnir={turniri.find(({id}) => id === prijava.turnir)} key={prijava.id}/>
            ))}
        </div>
    );
}
export default ConfirmApplications;