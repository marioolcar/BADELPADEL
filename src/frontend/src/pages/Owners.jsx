import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/pages/Owners.css"
import api from "../api";
import avatar_placeholder from "../assets/avatar_placeholder.png"
import Owner from "../components/Owner";

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
                    <Owner owner = {owner} key={owner.user.id}/>
                ))}
            </div>
        </>
    );
}

export default Owners;