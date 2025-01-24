import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../api";
import DatePicker from "react-datepicker";

function addTournament(){

    const navigate = useNavigate()

    var current_date = new Date()
    current_date.setMinutes(current_date.getMinutes()+60)
    current_date.setMinutes(0);
    current_date.setSeconds(0);
    current_date.setMilliseconds(0);

    const [tereni, setTereni] = useState([])
    const [naziv, setNaziv] = useState("");
    const [teren, setTeren] = useState(-1);
    const [cijena, setCijena] = useState(-1);
    const [nagrade, setNagrade] = useState("");
    const [opis, setOpis] = useState("");
    const [startDate, setStartDate] = useState(current_date);
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        api
        .get('/api/tereni/vlasnik/')
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setTereni(data);
            
        })
    }, [])

    async function handleSubmit(event){

        event.preventDefault();
        console.log({naziv, teren, opis, nagrade, cijena, startDate, endDate});
        
        if (teren === -1){
            alert("Odaberite teren");
            return;
        }

        await api.post('/api/turniri/',
            {naziv: naziv, teren: teren, opis: opis, nagrade: nagrade,
            cijena_kotizacije: cijena, datum_pocetka: startDate, datum_kraja: endDate}
        )
        .then((response) => {
            navigate("/")
        })
        .catch((err) => console.error(err))

    }

    return(
        <>
            <Header/>

            {(tereni.length === 0) ? <p>Nemate terena</p>: 

            <form onSubmit={handleSubmit}>

                <h1>Dodaj turnir</h1>

                <label htmlFor="naziv">Naziv: </label>
                <input name="naziv" id="naziv" onChange={(e) => setNaziv(e.target.value)}/>

                <label htmlFor="tereni">Teren: </label>
                <select id="tereni" onChange={(e) => setTeren(e.target.value)} defaultValue="select-field">
                    <option value="select-field" hidden>Izaberi teren</option>
                    {tereni.map((teren) => (
                        <option value={teren.id} key={teren.id}>{`${teren.lokacija_grad}, ${teren.lokacija_ulica}`}</option>
                    ))}
                </select>
                <br/>

                <label htmlFor="kotizacija">Cijena kotizacije: </label>
                <input type="number" id="kotizacija" name="kotizacija" onChange={(e) => setCijena(e.target.value)}/>

                <label>Pocetak: </label>
                <DatePicker selected={startDate} dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect timeIntervals={60} minDate={new Date()}
                    filterTime={(dateTime) => dateTime > new Date()}
                    onChange={(date) => setStartDate(date)}/>

                <br/>

                <label>Kraj: </label>
                <DatePicker selected={endDate} dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect timeIntervals={60} minDate={startDate}
                    filterTime={(dateTime) => dateTime > startDate}
                    onChange={(date) => setEndDate(date)}/>

                <br/>
                <label htmlFor="opis">Opis: </label>
                <input id="opis" name="opis" onChange={(e) => setOpis(e.target.value)}/>

                <label htmlFor="nagrade">Nagrade: </label>
                <input id="nagrade" name="nagrade" onChange={(e) => setNagrade(e.target.value)}/>

                <button type="submit">Submit</button>

            </form>}
        </>
    );
}

export default addTournament;