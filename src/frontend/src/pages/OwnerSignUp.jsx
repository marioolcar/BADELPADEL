import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Header from "../components/Header";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerSignUp(){

    // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    // const onCreateSubscription = (data, actions) => {
    //     return actions.subscription
    //         .create({
    //             plan_id: "P-3RX065706M3469222L5IFM4I",
    //         })
    // }

    // const onApproveSubscription = (data,actions) => {
    //     return actions.order.capture().then((details) => {
    //         handleConfirm()
    //     });
    // }

    const [telefon, setTelefon] = useState(null);
    const [adress, setAdress] = useState(null)

    const navigate = useNavigate()

    function handleConfirm() {

        api
            .post(`/api/register/owner/`, {telefon: telefon, adresa: adress})
            .then((res) => {
                navigate("/profile")
            })
            
    }

    return(
        <>
            <Header />
            <h1>Postanite Vlasnik</h1>
            <form>
                <label>Telefon: </label>
                <input type="tel" onChange={(e) => setTelefon(e.target.value)}/>
                <br/>
                <label>Adressa: </label>
                <input type="text" onChange={(e) => setAdress(e.target.value)}/>
                <br/>
                <button type="button" onClick={handleConfirm}>Potvrdi</button>
                <p>Postoji Paypal gumb u kodu, ali se nije implementirala pretplata (zahtjavala je adresu i jos par stvari kako bi se stvorio proizvod sto nisam htio stavljat na zajednicki racun)</p>
                {/* {isPending ? <p>LOADING...</p> : (
                    <PayPalScriptProvider options={{
                        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                        currency: "EUR",
                        intent: "subscription",
                        vault: true,
                      }}>
                        <PayPalButtons 
                            style={{ layout: "vertical" }}
                            createSubscription={(data, actions) => onCreateSubscription(data, actions)}
                            onApprove={(data, actions) => onApproveSubscription(data, actions)}
                        />
                    </PayPalScriptProvider>
                )} */}
            </form>
        </>
    );
}

export default OwnerSignUp;