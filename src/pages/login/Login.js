import React from "react";
import {Box,Container, TextField,Button,Autocomplete}  from "@mui/material"; 
import IABLogin from "../../assets/img/IABLogin.jpg";
import ApiServer from "../../services/ApiServer.js";
import {useAutenticaUser} from "../../store/AutenticaUser";
import { useNavigate } from "react-router-dom";


function Login() {

  const nameModulos =[{label:"Acolhimento IAB"},{label:"Estoque IAB"}]
  const  {LoginAuten}   = useAutenticaUser();
  const navigate = useNavigate();

  
 
    const PostUser = async (e) => {
      ApiServer.post('/PostUsuario',{nome: e.target.usuario.value,senha:e.target.senha.value})
      .then(req=>{console.log(req)})
    }

    const Modulo = (local) => {
      switch(local){
        case nameModulos[0].label:
          navigate("/Acolhimento")
        break;
        case nameModulos[1].label:
          navigate('/Estoque')
        break;
        default:
          navigate('/')
          break;
     }
    } 

  const Acessar = async (e) =>{
   e.preventDefault();

      PostUser(e);
await LoginAuten();
      Modulo(e.target.modulo.value); 

  }   
  
    

  return (
    
    <Container component="div" sx={{ justifyContent:"center",display:"flex", flexDirection:"column",alignItems:"center",minHeight: "100vh"
  }}>
      <Box component="div"  sx={{display:"flex",flexDirection:"row", minHeight:"400px", background:"#D9D9D9",}}>
          <Box component="div">
        
              <img  src={IABLogin} alt="imagem IAB no login" width="300" height="300"/>
      
         </Box>
      
         <Box component="form" onSubmit={Acessar}   sx={{ display:"flex", flexDirection:"column"}}>
             <TextField type="text"     name="usuario"  label="Usuario" variant="outlined" required={true} />
             <TextField type="password" name="senha"    label="Senha"   variant="outlined" required={true}/>
             <Autocomplete
                disablePortal
                options={nameModulos}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} name="modulo" label="Modulos" required={true}/>}
                />
             <Button variant="contained" type="submit">Acessar</Button>
            
          </Box>
         
      </Box>
     

  </Container>

    );
}

export default Login;