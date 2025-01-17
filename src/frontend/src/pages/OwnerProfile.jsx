import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../api";
import Field from "../components/Field"
import Tournament from "../components/Tournament";
import "../styles/pages/OwnerProfile.css"
import avatar_placeholder from "../assets/avatar_placeholder.png"

function OwnerProfile(){

    const navigate = useNavigate();

    const { userId } = useParams();
    const [userData, setUserData] = useState({})
    const [username, setUsername] = useState("");

    const [fields, setFields] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    function fetchUserData(){
        api
        .get(`/api/vlasnici/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setUserData(data);
            setUsername(data.user.username)
        }).catch((err) =>
        console.error("Couldn't fetch owner data"));
    }

    function fetchTournamentData(){
        api
        .get(`/api/turniri/vlasnik/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            setTournaments(data);
            console.log(data);
        }).catch(() =>
        console.error("Failed to fetch tournaments"));
    }

    function fetchFieldData(){
        api
        .get(`/api/tereni/vlasnik/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            setFields(data);
            console.log(data);
        }).catch(() =>
        console.error("Failed to fetch fields"));
    }

    useEffect(() => {
        fetchUserData();
        fetchTournamentData();
        fetchFieldData();
    },[])


    if (Object.keys(userData).length === 0){
        return (
            <h1>User not found</h1>
        );
    }

    return(
        <>
            <Header />
            <div className="profile-content">

                <div className="profile-right-block">
                    <img src={userData.slika === null ? avatar_placeholder : userData.slika}
                        alt="avatar" height={200} style={{borderRadius: 200}}/>
                    <p>{username}</p>
                    <p>Telefon: {userData.telefon}</p>
                </div>

                <hr id="divider"/>

                <div className="profile-left-block">

                    <div className="profile-field-block">

                        <div>
                            <h2>Fields</h2>
                            <button onClick={() => navigate('/add/field')}>Dodaj teren</button>
                        </div>
                        
                        <div className="profile-field-container">
                            {fields.length === 0 ? <p>No fields found</p> :
                                fields.map((field) => (
                                    <Field field={field} key={field.id} />
                            ))}
                        </div>

                    </div>

                    <hr/>

                    <div className="profile-tournament-block">

                        <div>
                            <h2>Tournaments</h2>
                            <button onClick={() => navigate('/add/tournament')}>Dodaj turnir</button>
                        </div>

                        <div className="profile-tournament-container">
                            {tournaments.length === 0 ? <p>No tournaments found</p> :
                            tournaments.map((tournament) => (
                                <Tournament tournament={tournament} key={tournament.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default OwnerProfile;