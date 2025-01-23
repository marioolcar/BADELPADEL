import { useState } from "react";
import { convertDateTime } from "../functions/Utility";
import api from "../api";
import Paypal from "../pages/Paypal";
import { sortData } from "../functions/Utility";

function SlotForm({termini}){

    termini = sortData(termini)

    const [paymentType, setPaymentType] = useState("gotovina");
    const [selectedSlot, setSelectedSlot] = useState(null);

    function handleConfirm(){
        if (selectedSlot === null){
            alert("Morate odabrati termin");
            return;
        }
        console.log(paymentType, selectedSlot);

        var deletedSlot = null
        api
        .delete(`/api/termin/delete/${selectedSlot}/`)
        .then((res) => deletedSlot = res.data.termin)
        .then(() => {
            console.log(deletedSlot)
            api.post(`/api/termin/zauzeti/`,
                {"pocetak": deletedSlot.pocetak, "kraj": deletedSlot.kraj, "teren": deletedSlot.teren_id, "cijena": deletedSlot.cijena})
                .then((res) =>{
                    location.reload()
                })
        })


    }

    return(
    <>
        <h1>Termini: </h1>
        <select onChange={(e) => setSelectedSlot(e.target.value)}>
            <option hidden>--Odaberite termin--</option>
        {termini.map((termin) => {
            return (
                <option key={termin.id} value={termin.id}>{convertDateTime(termin.pocetak)}: {termin.cijena}€</option>
        );
        })}
        </select>
        <input type="radio" name="payment" id="gotovina-payment" defaultChecked onChange={(e) => setPaymentType("gotovina")}></input>
        <label htmlFor="gotovina-payment">Gotovina</label>
        <input type="radio" name="payment" id="paypal-payment" onChange={(e) => setPaymentType("paypal")}></input>
        <label htmlFor="paypal-payment">PayPal</label>
        <button type="button" onClick={handleConfirm}>Submit</button>
    </>)
}

export default SlotForm