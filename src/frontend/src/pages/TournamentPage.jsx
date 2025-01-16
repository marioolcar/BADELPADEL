import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import api from "../api";
import { convertDateTime } from "../functions/Utility";
import FieldPageHeader from "../components/FieldPageHeader";
import TournamentBubbles from "../components/TournamentBubbles";
import CommentForm from "../components/CommentForm.jsx";
import Post from "../components/Post.jsx";
import "../styles/pages/TournamentPage.css";
import EnrollForm from "../components/EnrollForm.jsx";

function TournamentPage(){

    const { tournamentId } = useParams();
    const [tournament, setTournament] = useState([]);
    const [field, setField] = useState([]);
    const [posts, setPosts] = useState([]);


    function fetchFieldData(data){
        api
        .get(`/api/tereni/${data.teren}/`)
        .then((res) => res.data)
        .then((data) => {
            setField(data)
            console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    }

    function fetchPostData(){
        api
        .get(`/api/post/Turnir/${tournamentId}/`)
        .then((res) => res.data)
        .then((data) => {
            setPosts(data)
            console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    }

    useEffect (() => {
        api
        .get(`/api/turniri/${tournamentId}/`)
        .then((res) => res.data)
        .then((data) => {
            data.datum_pocetka = convertDateTime(data.datum_pocetka);
            data.datum_kraja = convertDateTime(data.datum_kraja);
            setTournament(data);
            fetchFieldData(data);

            if (data.otvorenost !== "otvoren"){
                fetchPostData();
            }
            
            console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    }, [])

    if (tournament.length === 0){
        return (
        <>
            <Header />
            <h1>Turnir nije pronađen</h1>
        </>);
    }
    return(
        <>
            <Header />
            <div style={{display: "flex"}}>
                <h1 id="tournament-name">{tournament.naziv}</h1>
                {tournament.otvorenost === "otvoren" ? <EnrollForm tournament = {tournament}/> : null}
            </div>

            <TournamentBubbles tournament = {tournament}/>
            <FieldPageHeader field = {field} />

            <div className="tournament-info-container">
                <h2>Detaljni opis:</h2>
                <p>{tournament.opis}</p>
            </div>

            <div className="tournament-info-container">
                <h2>Nagrade:</h2>
                <p>{tournament.nagrade}</p>
            </div>
            
            {(tournament.otvorenost === "zavrsen") ?
            <>
                <CommentForm tournamentId={tournamentId} fieldId={field.id} />
                <h2>Komentari ({posts.length})</h2>
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                    ))} 
            </> : null}
        </>
    );
}
export default TournamentPage