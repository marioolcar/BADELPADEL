import { useEffect, useState } from "react";
import api from "../api";
import avatar from "../assets/avatar_placeholder.png"
import { USERNAME } from "../constants";

function Post({post}){
    
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState("");

    useEffect(() => {

        //if post is not set don't fetch resource
        if (post.length === 0){
            return;
        }

        api
        .get(`/api/igraci/${post.user_id}/`)
        .then((res) => res.data)
        .then((data) => {
            setUserData(data)
            setUsername(data.user.username)
            //console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    },[post])

    async function handleDelete(){
        await api.delete(`/api/post/${post.id}/`)
        .catch((err) => console.error(err));
        location.reload()
    }

    return(
        <>
            <div style={{display: "flex"}}>
                <img src = {avatar} alt="avatar" height={50} style={{borderRadius: 50}}/>
                <p>{username}</p>

                <button onClick={(handleDelete)}>Izbrisi</button>
            </div>
            {post.slika === null ? null: <img src={post.slika} style={{maxHeight: 100}}/>}
            <p>{post.opis}</p>
        </>

    );
}
export default Post;