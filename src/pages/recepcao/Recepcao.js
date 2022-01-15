import React from "react";
import {Container}  from "@mui/material";
import {useAutenticaUser} from "../../components/AutenticaUser";


function Recepcao() {
  let {userLog}   = useAutenticaUser();
  
  return (

    <Container component="div" sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
    }}>
      <h2>{userLog}</h2>
        
        <h1>recepção</h1>
         

    </Container>
  
    );
}

export default Recepcao;