import { useEffect, useState } from "react";
import api from "../api";

function Application({prijava, turnir}){


    const [igracName, setIgracName] = useState("");
    const [turnirNaziv, setTurnirNaziv] = useState("");

    useEffect(() => {

        if (turnir !== undefined){
            setTurnirNaziv(turnir.naziv)
        }

        api
        .get(`/api/igraci/${prijava.user}/`)
        .then((res) => res.data)
        .then((data) => {
            setIgracName(data.user.username)
        })
    }, [prijava, turnir])

    function Accept(){
        console.log("Accept")
        api.post(`/api/prijava/accept/`, {prijava_id: prijava.id})
        .then((res) => {
            location.reload()
        })
    }

    function Reject(){
        console.log("Reject")
        api.delete(`/api/prijava/delete/turnir/${turnir.id}/user/${prijava.user}/`)
        .then((res) => {
            location.reload()
        })
    }

    return(
        <div>
            <p>{igracName} se želi prijaviti na: {turnirNaziv}</p>
            <button onClick={Accept}>Dopusti</button>
            <button onClick={Reject}>Odbij</button>
        </div>
    );
}

export default Application;