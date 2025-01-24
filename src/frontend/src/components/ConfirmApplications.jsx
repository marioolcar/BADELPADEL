import { useEffect, useState } from "react";
import api from "../api";
import Application from "./Applications";
import { sortData } from "../functions/Utility";

function ConfirmApplications({turniri}){

    const [prijave, setPrijave] = useState([]);


    async function getApplicationForTournament(turnir){

        api
            .get(`/api/prijava/turnir/${turnir.id}/`)
            .then((res) => res.data)
            .then((data) => {
                //console.log(data)
                sortData(data, "status")
                setPrijave(data)
            })

    }

    useEffect(() => {
        if (turniri === undefined){
            return
        }
        turniri.forEach((turnir) => {
                getApplicationForTournament(turnir)
            })
            
    }, [turniri])

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