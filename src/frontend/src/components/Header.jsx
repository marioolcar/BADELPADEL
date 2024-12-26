import "../styles/Header.css"
import logo from "../assets/logo.png"

function Header(){

    return(
        <div className="header-container">
            <img src={logo} alt="logo" height={75}></img>
            <nav className="navigation">
                <a className="header-links" href="/">Home</a>
                <a className="header-links" href="/fields">Fields</a>
                <a className="header-links" href="/tournaments">Tournaments</a>
                <a className="header-links" href="/notes">Notes</a>
            </nav>
            <a id="sign-in-button" className="header-links" href="/login">Sign in</a>
        </div>

    );

}
export default Header;