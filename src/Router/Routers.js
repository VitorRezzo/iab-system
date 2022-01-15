import React from "react";
import Login from "../pages/login/Login.js";
import CadUser from "../pages/cadUser/CadUser.js";
import Recepcao from "../pages/recepcao/Recepcao.js";
import Estoque from "../pages/estoque/Estoque.js";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";




export default function Routers() {
  
 
  
  const RotasPrivada = ({children}) =>{
    const auth = localStorage.getItem("auth");
    console.log(auth)
    return auth === "true" ? children   : <Navigate to="/" />  ;
  } 
    return (
      
      <Routes>
        
            <Route exact path="/" element={<Login/>}/>
            <Route path="/CadUser"  element={<CadUser/>}/>
            <Route path="/Recepcao" element={<RotasPrivada><Recepcao/></RotasPrivada>}/>
            <Route path="/Estoque" element={<RotasPrivada><Estoque/></RotasPrivada>}/>
      </Routes>
      
       
  
    );



  }