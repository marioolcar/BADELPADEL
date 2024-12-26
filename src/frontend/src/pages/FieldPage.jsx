import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";

function FieldPage(){

    const { fieldId } = useParams();
    const [field, setField] = useState([]);

    useEffect (() => {
        api
        .get(`/api/tereni/${fieldId}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data);
            //console.log(data);
        })
        .catch((err) => alert(err));
    }, [])

    return(
        <>
            <Header />
            <h1>{field.lokacija_grad}</h1>
            <p>{field.lokacija_ulica}</p>
        </>
    );
}

export default FieldPage;