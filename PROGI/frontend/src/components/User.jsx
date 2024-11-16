import React from "react";
import '../styles/Note.css'


function User({ user}) {

  return (
    <div className="note-container">
      <p className="note-title">{user.username}</p>
      <p className="note-content">{user.password}</p>
    </div>
  );
}

export default User