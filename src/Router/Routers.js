import React from "react";
import Login from "../pages/login/Login.js";
import CadUser from "../pages/cadUser/CadUser.js";
import Recepcao from "../pages/recepcao/Recepcao.js";
import Estoque from "../pages/estoque/Estoque.js";
import { PrivateRouters } from "./PrivateRouters.js";
import {
  Routes,
  Route,
 
} from "react-router-dom";



 
 


export default function Routers() {


 
  
  
    return  (

            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="/Recepcao" element= {<PrivateRouters><Recepcao/></PrivateRouters> }/>
              <Route exact path="/Estoque" element={<PrivateRouters><Estoque/></PrivateRouters>}/>
              <Route exact path="/CadUser"  element={<PrivateRouters><CadUser/></PrivateRouters>}/>
      
              <Route exact path="*"  element={<h1>pagina com erro</h1>}/>
            </Routes>
 


    );
             

              
    


  }

