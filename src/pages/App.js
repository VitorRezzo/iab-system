import React from "react";
import Router from "../Router/Routers.js"
import { AutenticaUserProvider } from "../store/AutenticaUser";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AutenticaUserProvider>
    <BrowserRouter>
        <Router/>
     </BrowserRouter>
     </AutenticaUserProvider>
   
    );
}

export default App;
