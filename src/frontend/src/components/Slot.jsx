import { useEffect, useState } from "react"
import api from "../api"
import Field from "./Field.jsx"
import { convertDateTime } from "../functions/Utility.jsx"

//24 hours in miliseconds
const ONE_DAY = 24 * 60 * 60 * 1000


function Slot({slot}){
    
    const [field, setField] = useState({})

    useEffect(() => {

        if (slot === undefined){
            return;
        }

        api
        .get(`/api/tereni/${slot.teren}/`)
        .then((res) => res.data)
        .then((data) => {
            console.log(data)
            setField(data)
        })
    },[slot])

    function handleDelete(){
        var deletedSlot = null
        api
        .delete(`/api/termin/zauzeti/delete/${slot.id}/`)
        .then((res) => deletedSlot = res.data.termin)
        .then(() => {
            console.log(deletedSlot)
            api.post(`/api/termin/`,
                {"pocetak": deletedSlot.pocetak, "kraj": deletedSlot.kraj, "teren": deletedSlot.teren_id, "cijena": deletedSlot.cijena})
                .then((res) => {
                    location.reload()
                })
        })
    }

    return (
        <div>
            <p>{convertDateTime(slot.pocetak)}</p>
            { (new Date(slot.pocetak) - new Date()) < ONE_DAY ? 
            null : 
            <button onClick={handleDelete}>Izbrisi</button>
            }
            <Field field = {field}/>
        </div>
    );
}

export default Slot