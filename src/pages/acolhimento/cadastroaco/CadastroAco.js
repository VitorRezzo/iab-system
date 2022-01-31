import React from "react";
import {Grid, Container,TextField,Button,Paper,Typography}  from "@mui/material";
import ApiServer from "../../../services/ApiServer.js";
import DrawerAco from "../components/DrawerAco.js" 
import Cookies from 'js-cookie';

export default function CadastroAco() {
    
   
    
    const CadastrarMo = async (event) =>{ 
    event.preventDefault();
     
            ApiServer.post("/CadastraMorador",{
            nomecompleto: event.target.nomecompleto.value,
            cpf:event.target.cpf.value,
            rg:event.target.rg.value,
            nascimento:event.target.nascimento.value,
            cidade:event.target.cidade.value,
            endereco:event.target.endereco.value,
            contato:event.target.contato.value,
            acompanhante: event.target.acompanhante.value,
            quarto:event.target.quarto.value,
            
            },{headers: {"x-acess-token":Cookies.get(process.env.REACT_APP_TOKEN)}}).then(()=>{
                alert("Um novo morador foi cadastrado!")
            })      
        
     }
           
      
           
    

  return (

    <DrawerAco>
 
         
        <Container component="form" onSubmit={CadastrarMo}   sx={{ display:"flex",marginTop:"8%",flexDirection:"column",alignItems:"center",height: "90vh",width:"90vw"
    }}>
            
            <Paper elevation={5}>
           <Grid  container  sx={{padding:"2%"}}    spacing={2} >
           
           <Grid item xs={8}>
           <Typography sx={{color:"#085A8C" }}  variant="h5" noWrap component="div">
            Novo Morador
          </Typography>
            </Grid>
           
                <Grid item xs={6}  >
               <TextField  type="text" name="nomecompleto"        label="Nome Completo"  variant="outlined" fullWidth />
               </Grid>
               <Grid item xs={3}  >
               <TextField type="text" name="cpf"         label="CPF" variant="outlined" fullWidth/>
               </Grid>
               <Grid item xs={3}>
               <TextField type="text" name="rg"          label="RG" variant="outlined" fullWidth/>
               </Grid>
               <Grid item xs={3}>
               <TextField type="date" name="nascimento" fullWidth/>
               </Grid>
               <Grid item xs={3}>
               <TextField type="text" name="cidade"      label="Cidade" variant="outlined" fullWidth />
               </Grid>
               <Grid item xs={3}>
               <TextField type="text" name="endereco"    label="Endereço" variant="outlined" fullWidth />
               </Grid>
               <Grid item xs={3}>
               <TextField type="text" name="contato"    label="Contato" variant="outlined" fullWidth />
               </Grid>
               <Grid item xs={3}>
               <TextField type="number" name="acompanhante"    label="Acompanhante" variant="outlined" fullWidth />
               </Grid>
               <Grid item xs={3}>
               <TextField type="text" name="quarto"    label="Quarto" variant="outlined" fullWidth />
               </Grid>
 
               </Grid>

              <Button sx={{float:"right", marginTop:"10%"}} variant="contained"  type="submit">Cadastrar</Button> 
              </Paper>
        </Container>
       
 
   
    </DrawerAco>
    );
}

