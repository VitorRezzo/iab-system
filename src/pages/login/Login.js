import React from "react";
import {Box,Container, TextField,Button}  from "@mui/material"; 
import {Link,useNavigate} from "react-router-dom";
import IMGBrunno from "../../img/IMGBrunno.jpg"
import axios from "axios";

function Login() {
  let navigate = useNavigate();


  const PostLogin = async (e) =>{
    await axios.post("http://127.0.0.1:3010/api/LogUsuario",{nome: e.target.usuario.value,senha:e.target.senha.value})
  }

  const Acessar = async (e) =>{
    e.preventDefault();
      PostLogin(e);    
      await axios.get("http://127.0.0.1:3010/api/AutenticaUsuario").then(response=>{
        if(response.data.nome === e.target.usuario.value && response.data.senha === e.target.senha.value  ){
            navigate('/Home');
        }else{
          alert("Usuario ou senha incorreto!")
        }  
      })
    
  }
    

  return (

    <Container component="div" sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
  }}>
      <Box component="div"  sx={{display:"flex",flexDirection:"row", minHeight:"400px", background:"gray",}}>
          <Box component="div">
        
              <img  src={IMGBrunno} alt="logo IAB" width="300" height="300"/>
      
         </Box>
      
         <Box component="form" onSubmit={Acessar}   sx={{ display:"flex", flexDirection:"column"}}>
             <TextField type="text"     name="usuario"  label="Usuario"  variant="outlined" />
             <TextField type="password" name="senha"    label="Senha" variant="outlined" />
             <Button variant="contained" type="submit"   >Acessar</Button>
             <Link to="/CadUser">Criar Conta</Link>
          </Box>
         
      </Box>
     

  </Container>
  
    );
}

export default Login;