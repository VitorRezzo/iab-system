import React,{useEffect} from "react";
import {Box,Container, TextField,Button,Autocomplete}  from "@mui/material"; 
import {Link} from "react-router-dom";
import IMGBrunno from "../../img/IMGBrunno.jpg";
import ApiServer from "../../config/ApiServer.js";
import {useAutenticaUser} from "../../components/AutenticaUser";



function Login() {

  const nameModulos =[{label:"Recepção IAB"},{label:"Estoque IAB"}]
  let {LoginAuten}   = useAutenticaUser();
  

 
    const PostUser = async (e) => {
      
      ApiServer.post('/PostUsuario',{nome: e.target.usuario.value,senha:e.target.senha.value}).then(req=>{alert(req+"jaenvei")})
      
    }

  const Acessar = (e) =>{
   e.preventDefault();
    if(e.target.usuario.value !== "" && e.target.senha.value !== ""  ){
      PostUser(e);
      LoginAuten(e.target.modulo.value); 
    }else{
      alert("Digite usuario e senha!")
    }
    
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
             <Autocomplete
                disablePortal
                options={nameModulos}
                
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} name="modulo" label="Modulos" />}
                />
             <Button variant="contained" type="submit">Acessar</Button>
             <Link to="/CadUser">Criar Conta</Link>
          </Box>
         
      </Box>
     

  </Container>

    );
}

export default Login;