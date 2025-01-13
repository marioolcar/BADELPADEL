import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";

function Profile(){

    const [user, setUser] = useState({});

    useEffect(() => {
        api
        .get("/api/user/")
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setUser(data)
        })
    }, [])

    return(
        <>
            <Header/>
        </>
    );
}

export default Profile;