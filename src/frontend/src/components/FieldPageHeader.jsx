import "../styles/FieldPageHeader.css"

function FieldPageHeader({field}) {
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