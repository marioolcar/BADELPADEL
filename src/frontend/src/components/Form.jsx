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
                navigate("/")
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

    function handleGoogleLogin(response){
        
        const code = response.credential
        api.post("/api/google-login/", {code:code})
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
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
            </button>

            <GoogleLogin onSuccess={handleGoogleLogin} buttonText="Login with Google"/>
        </form>
    );
}

export default Form