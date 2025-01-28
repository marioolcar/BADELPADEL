import { useEffect, useState } from "react";
import api from "../api";
import UserProfile from "./UserProfile";
import OwnerProfile from "./OwnerProfile";
import Header from "../components/Header";
import AdminProfile from "./AdminProfile";

function Profile(){

    const [type, setType] = useState("");

    useEffect(() => {

        api
            .get('/api/user/')
            .then((res) => res.data)
            .then((data) => {
                //console.log(data)
                setType(data.type)
            })

    }, [])

    if (type === "igrac"){
        return (<UserProfile />)
    }
    else if (type === "vlasnik"){
        return (<OwnerProfile />)
    }
    else if (type === "admin"){
        return (<AdminProfile />)
    }
    else if(type === ""){
        return (
            <>
                <Header />
                <p>Loading...</p>
            </>
        )
    }

}

export default Profile;