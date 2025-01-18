import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import { convertDateTime } from "../functions/Utility";
import "../styles/pages/FieldPage.css"
import FieldPageHeader from "../components/FieldPageHeader";
import Owner from "../components/Owner";

function FieldPage(){

    const { fieldId } = useParams();
    const [field, setField] = useState({});
    const [owner, setOwner] = useState({});
    const [termini, setTermini] = useState([]);

    function fetchOwner(fieldOwner){
        api
        .get(`/api/vlasnici/${fieldOwner}/`)
        .then((res) => res.data)
        .then((data) => {
            setOwner(data);
            console.log(data)
        }).catch((err) => {
            console.error("Couldn't fetch owner");
        })
    }

    useEffect (() => {
        api
        .get(`/api/tereni/${fieldId}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data);
            setTermini(data.dostupni_termini)
            fetchOwner(data.vlasnik)
            console.log(data);
        })
        .catch((err) => 
            console.error(err)
        );

        
    }, [])

    if (field.length === 0){
        return (
            <>
                <Header />
                <h1>Teren nije pronađen</h1>
            </>
        );
    }

    return(
        <>
            <Header />
            <FieldPageHeader field = {field}/>
            <Owner owner = {owner}/>
            <h1>Termini: </h1>
            {termini.map((termin) => {
                return (
                    <div>
                        <p>{convertDateTime(termin.pocetak)}</p>
                        <p>{convertDateTime(termin.kraj)}</p>
                        <p>{termin.cijena}</p>
                    </div>
            );
            })}
        </>
    );
}

export default FieldPage;