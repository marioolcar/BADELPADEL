import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/pages/Owners.css"
import api from "../api";
import avatar_placeholder from "../assets/avatar_placeholder.png"

function Owners(){

    const [owners, setOwners] = useState([]);

    useEffect(() => {
        api
        .get("/api/vlasnici/")
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
            setOwners(data);
        }).catch((err) => console.error(err))
    }, [])

    return(
        <>
            <Header />
            <div className='all-owners-container'>
                {owners.map((owner) => (
                <a key={owner.user.id} className="owner-link" href={`/profile/owner/${owner.user.id}`}>
                    <div className="owner-container">
                        <img src={owner.slika === null ? avatar_placeholder : owner.slika} height={100} style={{borderRadius: 100}}/>
                        <p className="owner-username">{owner.user.username}</p>
                    </div>
                </a>
                ))}
            </div>
        </>
    );
}

export default Owners;