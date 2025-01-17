import { useState } from "react";
import api from "../api";
import "../styles/components/CommentForm.css"

function CommentForm({fieldId, tournamentId}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        const dateTime = new Date()
        console.log(dateTime)

        await api.post("/api/post/",
            {slika: image, naslov: title, opis: description,
                vrijeme: `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`,
                //user_id: 1, 
                teren_id: fieldId, turnir_id: tournamentId}, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            location.reload()
        })
        .catch((err) => console.error(err))

    }

    return(
        <form className="comment-form" onSubmit={handleSubmit}>
            <input name="naslov" onChange={(e) => setTitle(e.target.value)} placeholder="Add a comment title"></input>
            <input name="opis" onChange={(e) => setDescription(e.target.value)} placeholder="Add a comment body"></input>
            <input name="image" onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/jpeg,image/png" />
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm;