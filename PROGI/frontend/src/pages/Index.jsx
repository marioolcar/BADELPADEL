import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
// import {Link} from 'react-router-dom'

function Index() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => addEventListener(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");

        getNotes();
      })
      .catch((err) => alert(err));
  };

  api
    .get("/api/notes/")
    .then((response) => {
      console.log("Notes:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching notes:", error);
    });
  //   const [users, setUsers] = useState([]);
  //   const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");

  //   useEffect(() => {
  //     getUsers();
  //   }, []);

  //   const [notes, setNotes] = useState([]);
  //   const [content, setContent] = useState("");
  //   const [title, setTitle] = useState("");

  //   useEffect(() => {
  //     getNotes();
  //   }, []);

  //   const getNotes = () => {
  //     api
  //       .get("/api/notes/")
  //       .then((res) => res.data)
  //       .then((data) => {
  //         setNotes(data);
  //         console.log(data);
  //       })
  //       .catch((err) => addEventListener(err));
  //   };

  // const getNotes = () => {
  //     api
  //       .get("/api/notes/")
  //       .then((res) => res.data)
  //       .then((data) => {
  //         setNotes(data);
  //         console.log(data);
  //       })
  //       .catch((err) => addEventListener(err));
  //   };

  // Fetch the list of users when the component mounts
  const getUsers = () => {
    // Make a GET request to fetch users
    // api
    // .get("/users/")  // Assuming /users/ is the endpoint for getting all users
    // .then((response) => {
    //     setUsers(response.data);  // Store users in state
    //     // setLoading(false);  // Set loading to false after fetching
    // })
    // .then((date) =>{
    //     setUsers(data);
    //     console.log(data)
    // })
    // .catch((err) => {
    //     setError("Error fetching users.");
    //     // setLoading(false);  // Set loading to false on error
    // });
  };

    api
      .get("/api/users/")
      .then((response) => {
        console.log("Usernames:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
      
  return (
    <div>
      <h1>Index page</h1>

      <nav>
        <li>
          <Link to={"./login"}>Login</Link>
        </li>
        <li>
          <Link to={"./register"}>Register</Link>
        </li>
        <li>
          <Link to={"./home"}>Profile</Link>
        </li>
      </nav>
      <div>
        <Link to='/logout'>
          <button className="logout-button">
            Logout
          </button>
        </Link>
      </div>

      <h2>List of notes</h2>
      <div>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
        {/* {notes.map((note) => (
            <Note note={note} />
            ))} */}
      </div>
      <h2>List of Users</h2>
    </div>
  );
}

export default Index;
