import React from "react";
import {Container, Box,TextField,Button}  from "@mui/material";
import IMGBrunno from "../../img/IMGBrunno.jpg"
import {useNavigate} from "react-router-dom";
import ApiServer from "../../config/ApiServer.js";

function CadUser() {

    let navigate = useNavigate();

    const Cadastrar = async (e) =>{ 
        e.preventDefault();
        
            await ApiServer.post("/CadastraUsuario",{nome: e.target.usuario.value,senha:e.target.senha.value})
            .then(()=>{
                alert("Usuario cadastrado com sucesso!")
            })           
    }

  return (

    <Container component="div" sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
    }}>
        
        <Box component="div"  sx={{display:"flex",flexDirection:"row", minHeight:"400px", background:"gray",}}>
            <Box component="div">
          
                <img  src={IMGBrunno} alt="logo IAB" width="300" height="300"/>
        
           </Box>
           <Button variant="contained" onClick={() => navigate("/")} >Voltar</Button>
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