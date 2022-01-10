import React from "react";
import {Box, TextField,Button}  from "@mui/material"; 
import {Link,useNavigate} from "react-router-dom";

function Login() {
  let navigate = useNavigate();
    


  return (

    <Box sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
    }}>
        <Box sx={{height:"400px", background:"gray", display:"flex", flexDirection:"column"}}>
        <TextField  label="Usuario"/>
        <TextField label="Senha"/>
        <Button variant="contained" onClick={() => navigate('/Home')} >Acessar</Button>
        <Link to="/CadUser">Cadastrar Usuario</Link>
            </Box>
       
    
      
    </Box>
  
    );
}

export default Login;