import React from "react";
import Login from "../pages/login/Login.js";
import CadUser from "../pages/cadUser/CadUser.js";
import Acolhimento from "../pages/acolhimento/Acolhimento.js";
import Estoque from "../pages/estoque/Estoque.js";
import CadastroAco from "../pages/acolhimento/cadastroaco/CadastroAco.js";
import RelatorioAco from "../pages/acolhimento/relatorioaco/RelatorioAco.js"
import { PrivateRouters } from "./PrivateRouters.js";
import {
  Routes,
  Route,
 
} from "react-router-dom";



 
 


export default function Routers() {

    return  (

            <Routes>
              <Route exact path="/" element={<Login/>}/>
              <Route exact path="/Acolhimento" element= {<PrivateRouters><Acolhimento/></PrivateRouters> }/>
              <Route exact path="/Estoque" element={<PrivateRouters><Estoque/></PrivateRouters>}/>
              <Route exact path="/CadUser"  element={<PrivateRouters><CadUser/></PrivateRouters>}/>
              <Route exact path="/CadastroAco"  element={<PrivateRouters><CadastroAco/></PrivateRouters>}/>
              <Route exact path="/RelatorioAco"  element={<PrivateRouters><RelatorioAco/></PrivateRouters>}/>

              <Route exact path="*"  element={<h1>Essa pagina não foi encontrada!</h1>}/>
            </Routes>
 


    );
             

              
    


  }

