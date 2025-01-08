import { useEffect, useState } from "react";
import api from "../api";
import avatar from "../assets/avatar_placeholder.png"

function Post({post}){
    
    const [userData, setUserData] = useState({});

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
            console.log(data);
        })
        .catch(//(err) => alert(err)
        );
    },[post])

    return(
        <>
            <div style={{display: "flex"}}>
                <img src = {avatar} alt="avatar" height={50} style={{borderRadius: 50}}/>
                <p>{post.naslov}</p>
            </div>
            {post.slika === null ? null: <img src={post.slika} style={{maxHeight: 100}}/>}
            <p>{post.opis}</p>
        </>

    );
}
export default Post;