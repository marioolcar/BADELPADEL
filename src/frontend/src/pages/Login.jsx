import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import axios from "axios";

function Login() {
    const [terenData, setTerenData] = useState([]);

    useEffect(() => {
        // Dohvaćanje podataka s backend-a
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tereni/"); // Promijenite na vaš stvarni endpoint
                setTerenData(response.data);
            } catch (error) {
                console.error("Greška prilikom dohvaćanja podataka:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Prikaz forme */}
            <Form route="/api/token/" method="login" />

            {/* Prikaz slika terena */}
            <div className="teren-gallery">
                {terenData.map((teren) => (
                    <div key={teren.id} className="teren-item">
                        <h3>{teren.lokacija_grad}, {teren.lokacija_ulica}</h3>
                        <img
                            src={teren.slika}
                            alt={`Slika terena: ${teren.lokacija_grad}`}
                            style={{  height: "300px", objectFit: "cover" }}
                        />
                        <p>Tip: {teren.tip}</p>
                        <p>Vlasnik ID: {teren.vlasnik}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Login;
