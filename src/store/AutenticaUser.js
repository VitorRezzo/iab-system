import React, { useContext,useEffect,useState} from "react";
import ApiServer from "../services/ApiServer.js";
import Cookies from 'js-cookie';



const AutenticaUser = React.createContext();

export function useAutenticaUser() {
  return useContext(AutenticaUser);
}

export function AutenticaUserProvider({ children }) {
 

const [userLog,setUserLog] = useState(null);  
  



const  LoginAuten = async ()=>{
  await ApiServer.get('/LoginUsuario').then(response=>{

   if(response.data.auth){
    Cookies.set(process.env.REACT_APP_TOKEN,response.data.token);
    localStorage.setItem("--auth",response.data.auth)
    setUserLog(response.data.nome);
   }else{
      localStorage.setItem("--auth",false)
     alert(response.data.message)
   }
    
})
}

const VerificaAutentica = async () => {
   
  await ApiServer.get('/AutenticaUser',{ 
    headers: {"x-acess-token":Cookies.get(process.env.REACT_APP_TOKEN)},
  }).then(response=>{
    
    if(response.data.auth === false){
      Cookies.remove(process.env.REACT_APP_TOKEN)
      localStorage.setItem("--auth",response.data.auth)
    }
    setUserLog(response.data.nome)
    
    
    
  })

 
};

useEffect( ()=>{
  VerificaAutentica()
},[])


  
  const value = {
    LoginAuten,
    userLog,
    VerificaAutentica,
 
  };

  return (
    <AutenticaUser.Provider value={value}>
      {children}
    </AutenticaUser.Provider>
  );
}