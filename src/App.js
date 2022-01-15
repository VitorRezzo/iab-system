import React from "react";
import Routers from "./Router/Routers"
import { AutenticaUserProvider } from "./components/AutenticaUser";

import {
  BrowserRouter,

} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
       <AutenticaUserProvider>
          <Routers/>
       </AutenticaUserProvider>
   </BrowserRouter>
     
    );
}

export default App;
