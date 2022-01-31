import React from "react";
import {Container, Box,TextField,Button}  from "@mui/material";
import ApiServer from "../../services/ApiServer.js";
import Cookies from 'js-cookie';

    function CadUser() {

    const Cadastrar = async (e) =>{ 
        e.preventDefault();
       
            ApiServer.post("/CadastraUsuario",{
                nome: e.target.usuario.value,
                senha:e.target.senha.value,
            },
            {headers: {"x-acess-token":Cookies.get(process.env.REACT_APP_TOKEN)}}).then(()=>{
                alert("Usuario cadastrado com sucesso!")
            })
         
    }

  return (

    <Container    sx={{ display:"flex",marginTop:"8%",flexDirection:"column",alignItems:"center",height: "90vh",width:"90vw"
}}>
        
        <Box component="div"  sx={{display:"flex",flexDirection:"row", minHeight:"400px"}}>
         
           <Box component="form" onSubmit={Cadastrar}   sx={{ display:"flex", flexDirection:"column"}}>
               <TextField type="text"     name="usuario"  label="Usuario"  variant="outlined" />
               <TextField type="password" name="senha"    label="Senha" variant="outlined" />
               <Button variant="contained" type="submit"   >Cadastrar</Button>
            </Box>
            
        </Box>
       
 
    </Container>
  
    );
}

export default CadUser;