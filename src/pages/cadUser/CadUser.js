import React from "react";
import {Container, Box,TextField,Button}  from "@mui/material";
import IMGBrunno from "../../img/IMGBrunno.jpg"
import axios from "axios";
import {useNavigate} from "react-router-dom";


function CadUser() {

    let navigate = useNavigate();


        
  


    const Cadastrar = async (e)=>{
       await axios.post("http://127.0.0.1:3010/api/cadastrouser",{nome: e.target.usuario.value,senha:e.target.senha.value})
    }
    
    const Submit =  (e) =>{ 
        e.preventDefault();
        try{
            Cadastrar(e);
            alert("Deu certo")
        }catch(error){
            console.log(error)
        }
    }

  return (

    <Container component="div" sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
    }}>
        <Box component="div"  sx={{display:"flex",flexDirection:"row", minHeight:"400px", background:"gray",}}>
            <Box component="div">
          
                <img  src={IMGBrunno} alt="logo IAB" width="300" height="300"/>
        
           </Box>
        
           <Box component="form" onSubmit={Submit}   sx={{ display:"flex", flexDirection:"column"}}>
               <TextField type="text"     name="usuario"  label="Usuario"  variant="outlined" />
               <TextField type="password" name="senha"    label="Senha" variant="outlined" />
               <Button variant="contained" type="submit"   >Cadastrar</Button>
            </Box>
            <Button variant="contained" onClick={() => navigate("/")} >Voltar</Button>
        </Box>
       
 
    </Container>
  
    );
}

export default CadUser;