import "../styles/components/FieldPageHeader.css"
import teren_placeholder from "../assets/teren_placeholder.png"

function FieldPageHeader({field}) {

    //if field doesn't exists
    if (field.length === 0){
        //console.log(field)
        return (
        <div className="field-page-header" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${teren_placeholder})`}}>
            <div className="field-page-header-info">
                <h1>Teren nije pronađen</h1>
            </div>
        </div>
        );
    }
    return (
    <div className="field-page-header" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${field.slika})`}}>
        <div className="field-page-header-info">
            <h1>{`${field.lokacija_grad}, ${field.lokacija_ulica}`}</h1>
            <p>{`Tip terena: ${field.tip}`}</p>
        </div>
    </div>
    );
}

export default FieldPageHeader;