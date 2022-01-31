import React from 'react';
import Box from '@mui/material/Box';
import DrawerAco from "./components/DrawerAco.js"
import LogoIAB from "../../assets/img/LogoIAB.jpg"


export default function Acolhimento(){

  return(
    
    <Box>
      <DrawerAco>
    <Box  sx={{ justifyContent:"center",display:"flex",alignItems:"center",  height: "90vh",width:"100%"
  }}>
    <Box component="div" sx={{display:"block"}} >
        
        <img  src={LogoIAB} alt="imagem IAB no login" width="300" height="300"/>

   </Box>
    </Box>

    </DrawerAco>
     
   
      
    
      
    </Box>
    
  );
}
