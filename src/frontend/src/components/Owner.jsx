import { useEffect, useState } from "react";
import "../styles/components/Owner.css"
import avatar_placeholder from "../assets/avatar_placeholder.png"

function Owner( {owner} ){

    const [username, setUsername] = useState("");
    const [id, setId] = useState(-1);

    useEffect(() => { 
        try{
            setUsername(owner.user.username)
            setId(owner.user.id)
        }catch{
            console.error("Couldn't get owner's username")
        };
    }, [owner])

    return(

        <div className="owner-container">
            <a key={id} className="owner-link" href={`/profile/owner/${id}`}>
                <div className="owner-container-details">
                    <img src={owner.slika === null ? avatar_placeholder : owner.slika} height={100} style={{borderRadius: 100}}/>
                    <p className="owner-username">{username}</p>
                </div>
            </a>
        </div>
    );
}

export default Owner;