import { useEffect, useState } from "react";
import api from "../api";
import UserProfile from "./UserProfile";
import OwnerProfile from "./OwnerProfile";

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

}

export default Profile;