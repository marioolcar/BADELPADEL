import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from 'react-google-button';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME } from "../constants";
import "../styles/components/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(USERNAME, username);
                navigate("/profile")
            } else {
                navigate("/login")
            }
        } catch (error) {
            //alert(error)
            location.reload()
        } finally {
            setLoading(false)
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {

            console.log(tokenResponse)
        
            api.post("/api/google-login/", {google_access_token: tokenResponse.access_token})
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                localStorage.setItem(ACCESS_TOKEN, data.access);
                localStorage.setItem(REFRESH_TOKEN, data.refresh);
                localStorage.setItem(USERNAME, username);
                navigate("/")
            })
            .catch ((err) => console.error(err))
        }
    })

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "50px", margin: "20px", width: "100%"}}>
            <h1>Login</h1>
            <GoogleButton onClick={handleGoogleLogin} buttonText="Login with Google"/>
                        {/* <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button> */}
        </div>


    );
}

export default Form