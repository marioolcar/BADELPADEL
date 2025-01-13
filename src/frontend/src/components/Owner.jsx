import { useEffect, useState } from "react";
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
        <div style={{display: "flex", alignItems: "center"}}>
            <a href={`/profile/owner/${id}`}>
                <img src={owner.slika === null ? avatar_placeholder : owner.slika} height={50} style={{borderRadius: 50}}/>
            </a>
            <p>{username}</p>
        </div>
    );
}

export default Owner;