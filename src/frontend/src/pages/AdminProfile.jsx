import { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import "../styles/pages/OwnerProfile.css"
import "../styles/pages/Owners.css"
import Owner from "../components/Owner";
import Field from "../components/Field";
import Tournament from "../components/Tournament";
import Player from "../components/Player";

function AdminProfile(){

    const [igraci, setIgraci] = useState([]);
    const [vlasnici, setVlasnici] = useState([]);
    const [fields, setFields] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    
    function fetchPlayers(){
        api
            .get(`/api/igraci/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setIgraci(data)
            })
    }

    function fetchOwners(){
        api
            .get(`/api/vlasnici/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setVlasnici(data)
            })
    }

    function fetchFields(){
        api
            .get(`/api/tereni/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setFields(data)
            })
    }

    function fetchTournaments(){
        api
            .get(`/api/turniri/`)
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                setTournaments(data)
            })
    }

    useEffect(() => {
        fetchPlayers()
        fetchOwners()
        fetchFields()
        fetchTournaments()
    }, [])

    function deleteField(id){
        api
            .delete(`/api/tereni/${id}/`)
            .then((res) => window.location.reload())
            .catch((err) =>
                console.error(err)
            )
    }

    function deleteTournament(id){
        api
            .delete(`/api/turniri/${id}/`)
            .then((res) => window.location.reload())
            .catch((err) =>
                console.error(err)
            )
    }

    function deleteUser(id){
        api
            .delete(`/api/user/${id}/`)
            .then((res) => window.location.reload())
            .catch((err) =>
                console.error(err)
            )
    }

    return (
        <>
            <Header />
            <div>
                <h1>Igraci</h1>

                {igraci.length === 0 ? 
                <p>Nisu pronadeni igraci</p> :
                    <div className="all-owners-container">
                        {igraci.map((igrac) => (
                            <div>
                                <Player player = {igrac} key={igrac.user.id}/>
                                <button type="button" onClick={(e) => deleteUser(igrac.user.id)}>Izbrisi</button>
                            </div>
                        ))}
                    </div>
                }

            </div>
            <div>
                <h1>Vlasnici</h1>
                {vlasnici.length === 0 ? 
                <p>Nisu pronadeni vlasnici</p> :
                <div  className="all-owners-container">
                    {vlasnici.map((vlasnik) => (
                        <div>
                            <Owner owner={vlasnik} key={vlasnik.user.id}/>
                            <button type="button" onClick={(e) => deleteUser(vlasnik.user.id)}>Izbrisi</button>
                        </div>
                    ))}
                </div>
                }  
            </div>
            <div>
                <h1>Tereni</h1>
                {fields.length === 0 ? 
                    <p>Nisu pronadeni tereni</p> :
                <div className="profile-field-container">
                    {fields.map((field) => (
                        <div>
                            <Field field = {field} key={field.id}/>
                            <button type="button" onClick={(e) => deleteField(field.id)}>Izbrisi</button>
                        </div>
                    ))}
                </div>
                }
            </div>
            <div>
                <h1>Turniri</h1>
                {tournaments.length === 0 ? 
                    <p>Nisu pronadeni turniri</p> :
                    <div className='profile-tournament-container'>
                        {tournaments.map((tournament) => (
                        <div>
                            <Tournament tournament = {tournament} key={tournament.id}/>
                            <button type="button" onClick={(e) => deleteTournament(tournament.id)}>Izbrisi</button>
                        </div>
                    ))}
                </div>
                }
            </div>
        </>
    );
}

export default AdminProfile;