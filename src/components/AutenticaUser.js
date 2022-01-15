import React, { useContext,useState,useEffect } from "react";
import ApiServer from "../config/ApiServer.js";
import Cookies from 'js-cookie';
import {
  useNavigate,
} from "react-router-dom";



const AutenticaUser = React.createContext();

export function useAutenticaUser() {
  return useContext(AutenticaUser);
}

export function AutenticaUserProvider({ children }) {

  
const navigate = useNavigate();



const [userLog,setUserLog] = useState();  

const  LoginAuten = async (local)=>{

  await ApiServer.get('/LoginUsuario').then(response=>{
  
   if(response.data.nome){
    Cookies.set(process.env.REACT_APP_TOKEN,response.data.token)
    localStorage.setItem("auth",response.data.auth);
    setUserLog(response.data.nome)
    switch(local){
      case "Recepção IAB":
        navigate("/Recepcao")
      break;
      case "Estoque IAB":
        navigate('/Estoque')
      break;
      default:
        navigate('/')
        break;

   }
   }else{
    alert("Usuario ou senha inválidos!")
    
  }
})
}


useEffect(()=>{
     
  const token = Cookies.get(process.env.REACT_APP_TOKEN);

    ApiServer.get('/AutenticaUser',{
      headers: {"x-acess-token":token},
    }).then(response=>{
      if(!response.data.auth){
        Cookies.remove(process.env.REACT_APP_TOKEN);
      }
      localStorage.setItem("auth",response.data.auth);
    })

},[])


  
  const value = {
    LoginAuten,
    userLog,
  };

  return (
    <AutenticaUser.Provider value={value}>
      {children}
    </AutenticaUser.Provider>
  );
}