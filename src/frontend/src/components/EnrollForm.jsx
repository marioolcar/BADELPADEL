import { useEffect, useState } from "react";
import api from "../api";
import "../styles/components/EnrollForm.css"

function EnrollForm({tournament}){

    const [enrollment, setEnrollment] = useState([]);

    async function handleEnroll(){
        await api.post(`/api/prijava/`,
            {turnir: tournament.id}
        )
        .then((res) => {
            location.reload()
        })
        .catch((err) => console.error(err))
    }

    async function handleUnenroll(){
        await api.delete(`/api/prijava/delete/turnir/${tournament.id}/`,
            {turnir: tournament.id}
        )
        .then((res) => {
            location.reload()
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        api
        .get(`/api/prijava/turnir/${tournament.id}/igraci/`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setEnrollment(data);
        }).catch(
            console.log("Couldn't get enrollments")
        )
    }, [])

    return(
        enrollment.length > 0 ?
        <> 
            <label htmlFor="unenroll" className = "enrollLabel">Odjavi</label>
            <button id="unenroll" onClick={handleUnenroll} hidden></button>
        </>:
        <>
            <label htmlFor="enroll" className="enrollLabel">Sudjeluj</label>
            <button id="enroll" onClick={handleEnroll} hidden></button>
        </>
    
    );
}

export default EnrollForm;