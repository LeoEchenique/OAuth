import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/index.scss";
import Navbar from "./Components/navbar"; 
import Profile_Edit from "./Components/Profile_Edit";
import Card from "./Components/Card";
import Profile from "./Components/Profile";
import Login from "./Components/Login";

function App() {
  

  return (
      <div className="App">
      <Routes>
        
        <Route exact path="/" element={<Card />} />
        <Route exact path="/Profile/:id" element={[<Navbar />, <Profile />]} />
        <Route exact path="/Profile/Edit" element={[<Navbar />, <Profile_Edit />]} />
    
      </Routes>
    

      </div>
    
  );
}

export default App;
