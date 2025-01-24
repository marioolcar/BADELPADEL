import "../styles/components/Header.css"
import logo from "../assets/logo.png"
import { ACCESS_TOKEN } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function Header(){
    
    const current_location = useLocation()
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        api
        .get(`/api/user/`)
        .then((res) => res.data.type)
        .then((data) => {
            //console.log(data);
            setUserType(data)
        })
    },[])

    function changeUserType(){
        api
        .post(`/api/register/igrac/`)
        .then((res) => {
            if (current_location.pathname === "/profile"){
                location.reload()
                return
            }
            navigate("/profile")
        })
    }

    return (
        <div className="header-container">
            <img src={logo} alt="logo" height={75} onClick={(e) => navigate("/")}></img>
            <nav className="navigation">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/profile")}>Profil</button>
                <button onClick={() => navigate("/fields")}>Tereni</button>
                <button onClick={() => navigate("/tournaments")}>Turniri</button>
                <button onClick={() => navigate("/owners")}>Vlasnici</button>
                { userType === "igrac" ?
                <button onClick={() => navigate("/register/owner")} className="sign-in-button">Postanite Vlasnik</button>
                : null
                }
                { userType === "vlasnik" ?
                <button onClick={changeUserType} className="sign-in-button">Postanite Igrac</button>
                : null
                }
                {!localStorage.getItem(ACCESS_TOKEN) ? 
                    <button onClick={() => navigate("/login")} className="sign-in-button">Sign in</button> :
                    <button onClick={() => navigate("/logout")} className="sign-in-button">Logout</button>}
            </nav>
         </div>
    )

    // return(
    //     <div className="header-container">
    //         <img src={logo} alt="logo" height={75}></img>
    //         <nav className="navigation">
    //             <a className="header-links" href="/">Home</a>
    //             <a className="header-links" href="/fields">Tereni</a>
    //             <a className="header-links" href="/tournaments">Turniri</a>
    //             <a className="header-links" href="/owners">Vlasnici</a>
    //             <a className="header-links" href="/notes">Notes</a>
    //             {!localStorage.getItem(ACCESS_TOKEN) ? 
    //             <a className="header-links" href="/login" id="sign-in-button">Sign in</a> :
    //             <a className="header-links" href="/logout" id="sign-in-button">Logout</a>}
    //         </nav>
    //     </div>

    // );

}
export default Header;