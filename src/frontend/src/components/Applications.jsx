import { useEffect, useState } from "react";
import api from "../api";

function Application({prijava, turnir}){


    const [igracName, setIgracName] = useState("");
    const [turnirNaziv, setTurnirNaziv] = useState("");

    useEffect(() => {
        //console.log(turnir)
        if (turnir !== undefined){
            setTurnirNaziv(turnir.naziv)
        }

        api
            .get(`/api/igraci/${prijava.user}/`)
            .then((res) => res.data)
            .then((data) => {
                //console.log(data)
                setIgracName(data.user.username)
            })
            .catch((err) =>
                console.error(err)
            )

    }, [prijava, turnir])

    function Accept(){

        api
            .post(`/api/prijava/accept/`, {prijava_id: prijava.id})
            .then((res) => {
                location.reload()
            })
    }

    function Reject(){

        api
            .delete(`/api/prijava/delete/turnir/${turnir.id}/user/${prijava.user}/`)
            .then((res) => {
                location.reload()
            })
    }

    return(
        <>
            {prijava.status != "prihvaćena" ? 
            
            <div style={{display: "flex"}}>
                <p>{igracName} se želi prijaviti na: {turnirNaziv}</p>
                <button onClick={Accept}>Dopusti</button>
                <button onClick={Reject}>Odbij</button>
            </div>:

            <div>
                <p>{igracName} je prijavljen na: {turnirNaziv}</p>
            </div>
            }
        </>
    );
}

export default Application;