import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";

function addTournament(){

    const [tereni, setTereni] = useState([])
    const [naziv, setNaziv] = useState("");
    const [teren, setTeren] = useState(-1);
    const [cijena, setCijena] = useState(-1);
    const [nagrade, setNagrade] = useState("");
    const [opis, setOpis] = useState("");

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
        console.log({naziv, teren, opis, nagrade, cijena})

        await api.post('/api/turniri/', {naziv: naziv, teren: teren, opis: opis, nagrade: nagrade,
            cijena_kotizacije: cijena, datum_pocetka: new Date(), datum_kraja: new Date()}
        )
        .then((response) => {
            location.reload()
        })
        .catch((err) => console.error(err))

    }

    return(
        <>
            <Header/>
            {(tereni.length === 0) ? <p>Nemate terena</p>: 
            <form onSubmit={handleSubmit}>
                <label htmlFor="naziv">Naziv: </label>
                <input name="naziv" id="naziv" onChange={(e) => setNaziv(e.target.value)}/>
                <label htmlFor="tereni">Teren: </label>
                <select id="tereni" onChange={(e) => setTeren(e.target.value)}>
                    <option selected hidden>Izaberi teren</option>
                    {tereni.map((teren) => (
                        <option value={teren.id} key={teren.id}>{`${teren.lokacija_grad}, ${teren.lokacija_ulica}`}</option>
                    ))}
                </select>
                <label htmlFor="kotizacija">Cijena kotizacije: </label>
                <input type="number" id="kotizacija" name="kotizacija" onChange={(e) => setCijena(e.target.value)}/>
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