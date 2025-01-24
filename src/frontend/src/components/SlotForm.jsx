import { useState } from "react";
import { convertDateTime } from "../functions/Utility";
import "../styles/components/SlotForm.css"
import api from "../api";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { sortData } from "../functions/Utility";
import { useNavigate } from "react-router-dom";

function SlotForm({termini}){

    termini = sortData(termini)
    const navigate = useNavigate()

    const [paymentType, setPaymentType] = useState("gotovina");
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [price, setPrice] = useState(null);
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

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
            //console.log(deletedSlot)
            api.post(`/api/termin/zauzeti/`,
                {"pocetak": deletedSlot.pocetak, "kraj": deletedSlot.kraj, "teren": deletedSlot.teren_id, "cijena": deletedSlot.cijena})
                .then((res) =>{
                    navigate("/profile")
                })
        })


    }

    const payWithCash = () => {
        if(confirm(`Jeste li sigurni da želite platiti gotovinom? ${price}€`)){
            handleConfirm()
        }
    }

    const onCreateOrder = (data,actions) => {
        console.log(price)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: price,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            handleConfirm()
        });
    }

    return(
    <>
        <h1>Termini: </h1>

        <div className="slot-form">
            <select onChange={(e) => setSelectedSlot(e.target.value)}>
                <option hidden>--Odaberite termin--</option>
            {termini.map((termin) => {
                return (
                    <option key={termin.id} value={termin.id} onClick={(e) => setPrice(termin.cijena)}>
                        {convertDateTime(termin.pocetak)}: {termin.cijena}€
                        </option>
            );
            })}
            </select>
            {price === null ? null :
            <div>
                <button type="button" onClick={(e) => payWithCash()} style={{width: "100%"}}>Gotovina</button>
            </div>
            }  
        </div>

        <div className="checkout">
            {price === null ? null :
            isPending ? <p>LOADING...</p> : (
                <>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    </>)
}

export default SlotForm