import React from 'react';
import './app.css';
import Home from './home/Home.jsx';
import Login from './login/Login.jsx'
import Register from './register/Register.jsx';
import Profile from "./profile/Profile.jsx"
import {Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Register" element ={<Register/>}/>
    </Routes>
  </BrowserRouter>
  );
}
export default App;