import { useState } from "react";
import api from "../api";
import Header from "../components/Header";

function AddField (){

    const [grad, setGrad] = useState("");
    const [ulica, setUlica] = useState("");
    const [tip, setTip] = useState("unutarnji");
    const [slika, setSlika] = useState(null);

    function handleSubmit (event) {
        event.preventDefault()
        console.log(grad, ulica, tip)

        api.post("/api/tereni/", {lokacija_grad: grad, lokacija_ulica: ulica, tip: tip, slika: slika}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            location.reload()
        }).catch((err) => console.error(err));
        
    }

    return(
        <>
            <Header/>
            <form onSubmit={handleSubmit} style={{"display":"flex", "flex-direction": "column"}}>
                <label htmlFor="teren-grad-input">Grad: </label>
                <input name ="grad" id="teren-grad-input" placeholder="Grad" onChange={(e) => setGrad(e.target.value)}/>
                <label htmlFor="teren-ulica-input">Ulica: </label>
                <input name="ulica" id="teren-ulica-input" placeholder="Ulica" onChange={(e) => setUlica(e.target.value)}/>
                <label htmlFor="tip-terena">Tip</label>
                <select name="tip" id="tip-terena" onChange={(e) => setTip(e.target.value)} placeholder="Tip terena">
                    <option value="unutarnji">Unutranji</option>
                    <option value="vanjski">Vanjski</option>
                </select>
                <input type="date" minDate={0} />
                <label htmlFor="slika">Slika (opcionalno)</label>
                <input name="image" id="slika" onChange={(e) => setSlika(e.target.files[0])} type="file" accept="image/jpeg,image/png" />
                <button type="submit" style={{"width": "fit-content"}}>Submit</button>
            </form>
        </>
    );
};
export default AddField