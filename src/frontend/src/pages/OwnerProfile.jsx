import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../api";
import Field from "../components/Field"
import Tournament from "../components/Tournament";
import "../styles/pages/OwnerProfile.css"
import avatar_placeholder from "../assets/avatar_placeholder.png"
import ConfirmApplications from "../components/ConfirmApplications";

function OwnerProfile(){

    const navigate = useNavigate();
    const { userId } = useParams();

    const [isPublic, setIsPublic] = useState(true)
    const [userData, setUserData] = useState({})
    const [username, setUsername] = useState("");
    const [fields, setFields] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    const location = useLocation()


    function fetchUserData(){
        var api_path = `/api/vlasnici/current/`
        if (userId != undefined){
            api_path = `/api/vlasnici/${userId}/`
        }

        api
        .get(`${api_path}`)
        .then((res) => res.data)
        .then((data) => {
            if (Array.isArray(data)){
                data = data[0]
            }
            setUserData(data);
            setUsername(data.user.username)
        }).catch((err) => {
            console.error(err)
        console.error("Couldn't fetch owner data")});
    }

    function fetchTournamentData(){
        var api_path = "/api/turniri/vlasnik/"
        if (userId != undefined){
            api_path +=`${userId}/`
        }

        api
        .get(`${api_path}`)
        .then((res) => res.data)
        .then((data) => {
            setTournaments(data);
            //console.log(data);
        }).catch(() =>
        console.error("Failed to fetch tournaments"));
    }

    function fetchFieldData(){
        var api_path = "/api/tereni/vlasnik/"
        if (userId != undefined){
            api_path +=`${userId}/`
        }

        api
        .get(`${api_path}`)
        .then((res) => res.data)
        .then((data) => {
            setFields(data);
            //console.log(data);
        }).catch(() =>
        console.error("Failed to fetch fields"));
    }

    useEffect(() => {
        if (location.pathname === "/profile"){
            setIsPublic(false)
        }
        fetchUserData();
        fetchTournamentData();
        fetchFieldData();
    },[])


    if (Object.keys(userData).length === 0){
        return (
            <>
                <Header />
                <h1>User not found</h1>
            </>
        );
    }

    return(
        <>
            <Header />
            <div className="profile-content">

                <div className="profile-left-block">
                    <img src={userData.slika === null ? avatar_placeholder : userData.slika}
                        alt="avatar" height={200} style={{borderRadius: 200}}/>
                    <p>{username}</p>
                    <p>Telefon: {userData.telefon}</p>
                    <p>Adresa: {userData.adresa}</p>
                </div>

                <hr id="divider"/>

                <div className="profile-right-block">

                    <div className="profile-field-block">

                        <div>
                            <h2>Tereni</h2>
                            {isPublic ? null:
                            <button onClick={() => navigate('/add/field')}>Dodaj teren</button>
                            }
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
                            <h2>Turniri</h2>
                            {isPublic ? null:
                            <button onClick={() => navigate('/add/tournament')}>Dodaj turnir</button>
                            }
                        </div>

                        <div className="profile-tournament-container">
                            {tournaments.length === 0 ? <p>No tournaments found</p> :
                            tournaments.map((tournament) => (
                                <Tournament tournament={tournament} key={tournament.id} />
                            ))}
                        </div>
                        {isPublic ? null:
                        <>
                            <hr/>
                            <p>Prijave</p>
                            <ConfirmApplications />
                            <hr/>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}
export default OwnerProfile;