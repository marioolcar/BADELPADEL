import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/FieldPage.css"

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
        .catch((err) => alert(err));
    }, [])

    return(
        <>
            <Header />
            <div className="field-page-header" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${field.slika})`}}>
                <div className="field-page-header-info">
                    <h1>{`${field.lokacija_grad}, ${field.lokacija_ulica}`}</h1>
                    <p>{`Tip terena: ${field.tip}`}</p>
                </div>
            </div>
        </>
    );
}

export default FieldPage;