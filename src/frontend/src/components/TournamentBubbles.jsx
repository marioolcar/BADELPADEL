import "../styles/components/TournamentBubbles.css"
import { convertDateTime, checkOtvorenost } from "../functions/Utility";

function TournamentBubbles({tournament}){

    var otvorenost = checkOtvorenost(tournament)

    return (
    <div className="tournament-header">
        <div className="tournament-date-price-info">
            <div className="bubbles">
                <p className="tournament-header-maintext">{tournament.cijena_kotizacije}€</p>
                <p className="tournament-header-subtext">Cijena kotizacije</p>
            </div>
            <div className="bubbles">
                <p className="tournament-header-maintext">{convertDateTime(tournament.datum_pocetka)}</p>
                <p className="tournament-header-subtext">Datum početka</p>
            </div>
            <div className="bubbles">
                <p className="tournament-header-maintext">{convertDateTime(tournament.datum_kraja)}</p>
                <p className="tournament-header-subtext">Datum kraja</p>
            </div>
            <div className="bubbles">
                <p className="tournament-header-maintext">{otvorenost}</p>
            </div>
        </div>
        </div>
    );
}
export default TournamentBubbles