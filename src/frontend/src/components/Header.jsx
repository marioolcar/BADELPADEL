import "../styles/components/Header.css"
import logo from "../assets/logo.png"
import { ACCESS_TOKEN } from "../constants";

function Header(){

    return(
        <div className="header-container">
            <img src={logo} alt="logo" height={75}></img>
            <nav className="navigation">
                <a className="header-links" href="/">Home</a>
                <a className="header-links" href="/fields">Tereni</a>
                <a className="header-links" href="/tournaments">Turniri</a>
                <a className="header-links" href="/owners">Vlasnici</a>
                <a className="header-links" href="/notes">Notes</a>
                {!localStorage.getItem(ACCESS_TOKEN) ? 
                <a className="header-links" href="/login" id="sign-in-button">Sign in</a> :
                <a className="header-links" href="/logout" id="sign-in-button">Logout</a>}
            </nav>
        </div>

    );

}
export default Header;