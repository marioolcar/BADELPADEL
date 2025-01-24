import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import SlotForm from "../components/SlotForm";
import "../styles/pages/FieldPage.css"
import FieldPageHeader from "../components/FieldPageHeader";
import Owner from "../components/Owner";

function FieldPage(){

    const { fieldId } = useParams();
    const [userType, setUserType] = useState(null)
    const [field, setField] = useState({});
    const [owner, setOwner] = useState({});
    const [termini, setTermini] = useState([]);

    function fetchOwner(fieldOwner){
        api
        .get(`/api/vlasnici/${fieldOwner}/`)
        .then((res) => res.data)
        .then((data) => {
            setOwner(data);
            //console.log(data)
        }).catch((err) => {
            console.error("Couldn't fetch owner");
        })
    }

    function fetchTermini(){
        api
        .get(`/api/termin/${fieldId}/`)
        .then((res) => res.data)
        .then((data) => {
            //console.log(data)
            setTermini(data)
        }).catch((err) => console.error(err))
    }

    function getUserType(){
        api
        .get(`/api/user/`)
        .then((res) => res.data.type)
        .then((data) => {
            //console.log(data)
            setUserType(data)
        })
    }

    useEffect (() => {
        fetchTermini()
        getUserType()
        api
        .get(`/api/tereni/${fieldId}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data);
            fetchOwner(data.vlasnik)
            //console.log(data);
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
            { userType === "igrac" ?
            <SlotForm termini = {termini} />:
            null
            }
        </>
    );
}

export default FieldPage;