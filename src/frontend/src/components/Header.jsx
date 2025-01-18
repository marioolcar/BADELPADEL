import "../styles/components/Header.css"
import logo from "../assets/logo.png"
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    return (
        <div className="header-container">
             <img src={logo} alt="logo" height={75}></img>
             <nav className="navigation">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/fields")}>Tereni</button>
                <button onClick={() => navigate("/tournaments")}>Turniri</button>
                <button onClick={() => navigate("/owners")}>Vlasnici</button>
                <button onClick={() => navigate("/notes")}>Notes</button>
                
                {!localStorage.getItem(ACCESS_TOKEN) ? 
                    <button onClick={() => navigate("/login")} id="sign-in-button">Sign in</button> :
                    <button onClick={() => navigate("/logout")} id="sign-in-button">Logout</button>}
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