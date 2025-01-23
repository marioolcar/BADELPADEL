import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";
import Header from "../components/Header";

function AddField (){

    //get current date and round up to the hour
    var current_date = new Date()
    current_date.setMinutes(current_date.getMinutes()+60)
    current_date.setMinutes(0);
    current_date.setSeconds(0);
    current_date.setMilliseconds(0);

    const [grad, setGrad] = useState("");
    const [ulica, setUlica] = useState("");
    const [tip, setTip] = useState("unutarnji");
    const [slika, setSlika] = useState(null);
    const [cijena, setCijena] = useState(-1);
    const [termini, setTermini] = useState([]);
    const [date, setDate] = useState(current_date);

    //function which runs after the form has been submitted
    function handleSubmit (event) {
        event.preventDefault()
        console.log(grad, ulica, tip, slika, termini)

        if (termini.length === 0){
            alert("Niste odabrali niti jedan termin")
            return;
        }
        if (grad === ""){
            alert("Grad ne moze biti prazan string")
            return;
        }
        if (ulica === ""){
            alert("Ulica ne moze biti prazan string")
            return;
        }

        api.post("/api/tereni/",
            {lokacija_grad: grad, lokacija_ulica: ulica, tip: tip, slika: slika},
            {headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            const teren = response.data
            termini.forEach((termin) => {
                api.post(`/api/termin/`,
                    {pocetak: termin.pocetak, kraj: termin.kraj, cijena: termin.cijena, teren: teren.id})
            })
            
        })
        .catch((err) => console.error(err));
        
    }

    //function which adds a timeslot to a list
    function addTimeslot(){
        if (termini.filter((termin) => termin.pocetak === date ).length > 0){
            alert("Trenutni termin je već definiran")
        }
        else{
            var kraj = new Date(date.getTime());
            kraj.setHours(kraj.getHours()+1)
            setTermini([...termini, {pocetak: date, kraj: kraj, cijena: cijena}])
        }
        console.log(termini)
    }

    //filter function for DatePicker
    const filterPassedDateTime = (dateTime) => {
        if (dateTime >= new Date()){
            return true
        }
        return false
    }

    function izbrisiTermin(pocetak) {
        setTermini(termini.filter((termin) => termin.pocetak !== pocetak))
    }

    function formatDate(pocetak, kraj){
        return `${pocetak.getMonth()+1}.${pocetak.getDate()}.${pocetak.getFullYear()} ${pocetak.getHours()}:00 - ${kraj.getHours()}:00`
    }

    return(
        <>
            <Header/>
            <form onSubmit={handleSubmit} style={{"display":"flex", "flexDirection": "column"}}>

                <h1>Dodaj teren</h1>

                <label htmlFor="teren-grad-input">Grad: </label>
                <input name ="grad" id="teren-grad-input" placeholder="Grad" onChange={(e) => setGrad(e.target.value)}/>

                <label htmlFor="teren-ulica-input">Ulica: </label>
                <input name="ulica" id="teren-ulica-input" placeholder="Ulica" onChange={(e) => setUlica(e.target.value)}/>

                <label htmlFor="tip-terena">Tip:</label>
                <select name="tip" id="tip-terena" onChange={(e) => setTip(e.target.value)} placeholder="Tip terena">
                    <option value="unutarnji">Unutranji</option>
                    <option value="vanjski">Vanjski</option>
                </select>

                <label>Termini (po sat vremena): </label>
                <DatePicker selected={date} dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect timeIntervals={60} minDate={new Date()}
                    filterTime={filterPassedDateTime} onChange={(date) => setDate(date)}/>

                <label>Cijena termina: </label>
                <input type="number" onChange={(e) => setCijena(e.target.value)}></input>

                <button type="button" onClick={addTimeslot}>Add</button>

                <div className="termini-container">
                    {termini.map((termin) => {
                        if (!termin.hasOwnProperty("pocetak")){
                            return null;
                        }
                        const formatted_termin = formatDate(termin.pocetak, termin.kraj)
                        return (
                        <div>
                            <p key={termin.pocetak}>{formatted_termin}</p>
                            <button type="button" onClick={(event) => izbrisiTermin(termin.pocetak)}>Izbrisi</button>
                        </div>)
                    })}
                </div>

                <label htmlFor="slika">Slika (opcionalno)</label>
                <input name="image" id="slika" onChange={(e) => setSlika(e.target.files[0])} type="file" accept="image/jpeg,image/png" />
                <button type="submit" style={{"width": "fit-content"}}>Submit</button>

            </form>
        </>
    );
};
export default AddField