import React from "react";
import "../styles/Field.css"

function Field({ field }) {

    console.log(field.slika)

    return (

        <div className="field">
            <a className="field-link" href={`/fields/${field.id}`}>
                <div className="field-header" style={{backgroundImage: `url(${field.slika})`, backgroundSize: "cover", borderRadius:"10px 10px 0px 0px"}}>
                    <p className="field-city">{field.lokacija_grad}</p>
                </div>
            </a>
            <div className="other-field-data">
                <p className="field-street">{field.lokacija_ulica}</p>
                <p className="field-type">{field.tip}</p>
            </div>
        </div>
    );
}

export default Field
