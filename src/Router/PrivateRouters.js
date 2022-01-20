import { useAutenticaUser } from "../store/AutenticaUser.js";
import {
    Navigate
  } from "react-router-dom";



   

    export const PrivateRouters = ({children}) => {
    
    let {userLog} = useAutenticaUser();
    
    let auth = localStorage.getItem("--auth");
      
     
    if(auth === "false" && !userLog){
      return  <Navigate to="/"/>
     }

    if( auth === "true"){

      return children
     
    }


    
  }