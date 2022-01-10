import React from "react";
import Login from "../pages/login/Login.js";
import CadUser from "../pages/cadUser/CadUser.js";
import Home from "../pages/home/Home.js";

import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";


export default function Routers() {
    return (
      < BrowserRouter>
      <Routes>
            <Route exact path="/" element={<Login/>}/>
            
            <Route path="/CadUser" element={<CadUser/>}/>
                 
            <Route path="/Home" element={<Home/>}>
            
            </Route>    
      </Routes>
      </ BrowserRouter>
    );
  }