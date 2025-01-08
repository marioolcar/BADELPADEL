import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../api";
import Field from "../components/Field"
import Tournament from "../components/Tournament";
import "../styles/Profile.css"

function Profile(){

    const { userId } = useParams();
    const [userData, setUserData] = useState([])
    const [fields, setFields] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    function fetchUserData(){
        api
        .get(`/api/vlasnici/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            setUserData(data);
            console.log(data);
        }).catch((err) =>
        console.error(err));
    }

    function fetchTournamentData(){
        api
        .get(`/api/turniri/vlasnik/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            setTournaments(data);
            console.log(data);
        }).catch((err) =>
        console.error(err));
    }

    function fetchFieldData(){
        api
        .get(`/api/tereni/vlasnik/${userId}/`)
        .then((res) => res.data)
        .then((data) => {
            setFields(data);
            console.log(data);
        }).catch((err) =>
        console.error(err));
    }

    useEffect(() => {
        fetchUserData();
        fetchTournamentData();
        fetchFieldData();
    },[])

    return(
        <>
            <Header />
            <div className="profile-content">
                <div className="profile-right-block">
                    {userData.slika === null ? null : <img src={userData.slika} alt="avatar" height={200}/>}
                    <p>{userData.telefon}</p>
                </div>
                <hr id="divider"/>
                <div className="profile-left-block">
                    <div className="profile-field-block">
                        <h2>Fields</h2>
                        <div>
                            {fields.length === 0 ? <p>No fields found</p> :
                                fields.map((field) => (
                                    <Field field={field} key={field.id} />
                            ))}
                        </div>
                    </div>
                    <hr/>
                    <div className="profile-tournament-block">
                        <h2>Tournaments</h2>
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
export default Profile;