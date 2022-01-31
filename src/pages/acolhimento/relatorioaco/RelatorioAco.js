import React from 'react';
import Box from '@mui/material/Box';
import DrawerAco from "../components/DrawerAco.js"
import Table from "./components/Table.js"
import Paper from '@mui/material/Paper'

export default function RelatorioAco(){

  return(
    
   
      <DrawerAco>
    <Box  sx={{ display:"flex",alignItems:"center",  height: "90vh",width:"100%"
  }}>
  <Paper sx={{width:"100%"}} elevation={3} >        
  <Table />
  </Paper>


   </Box>
   

    </DrawerAco>
  )
}