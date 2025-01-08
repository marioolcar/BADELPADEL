import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/FieldPage.css"
import FieldPageHeader from "../components/FieldPageHeader";

function FieldPage(){

    const { fieldId } = useParams();
    const [field, setField] = useState([]);

    useEffect (() => {
        api
        .get(`/api/tereni/${fieldId}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data);
            console.log(data);
        })
        .catch(//(err) => alert(err)
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
        </>
    );
}

export default FieldPage;