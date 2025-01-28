import { useEffect, useState } from "react";
import avatar_placeholder from "../assets/avatar_placeholder.png"
import "../styles/components/Owner.css"

function Player( {player} ){

    const [username, setUsername] = useState("");

    useEffect(() => {

        if (player != undefined){
            setUsername(player.user.username)
        }
        
    }, [player])

    return(

        <div className="owner-container">
            <div className="owner-container-details">
                <img src={player.slika === null ? avatar_placeholder : player.slika} height={100} style={{borderRadius: 100}}/>
                <p className="owner-username">{username}</p>
            </div>
        </div>
    
    );
}
export default Player;