import React,{useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FeedIcon from '@mui/icons-material/Feed';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationAco from "./NavigationAco.js";
import { useNavigate } from "react-router-dom";
import Mensageiro from './Mensageiro.js';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DrawerAco({children}) {

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [msg,setMsg] = useState("");
  const [title,settitle] = useState("");


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    
      <Box>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{background:'#049DD9',display:"flex"}}>
         
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon alt="Menu" />
          </IconButton>
          <Typography  variant="h6" noWrap component="div">
            ACOLHIMENTO IAB
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          height:"100%",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background:'linear-gradient(180deg, rgba(4,157,217,1) 50%, rgba(3,120,166,1) 78%)',
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <MenuOpenIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
          <Divider/> 
        <List sx={{color:"#FFFF"}}>
          
        {['Inicio', 'Cadastro', 'Relatórios', 'Configuração','Sobre'].map((text,index) => (
            <ListItem  button onClick={()=>{NavigationAco(index,navigate)}} key={text}>
            <ListItemIcon  >      
              {index === 0 ?  < HomeIcon sx={{color:"#0066FC"}}/> : null}                
              {index === 1 ?  <ContactPageIcon  sx={{color:"#02E5B4"}}/> : null}
              {index === 2 ?  <FeedIcon sx={{color:"#F2485B"}}/> : null}
              {index === 3 ?  <SettingsIcon sx={{color:"#F38900"}} /> : null}  
              {index === 4 ?  <InfoIcon sx={{color:"#7D6B7D"}}/> : null}   
                  
             </ListItemIcon>
             <ListItemText  primary={text} />
            </ListItem>
          ))}
           
          
        </List>
        <Divider  />
        
        <Mensageiro />
        <p style={{marginLeft:"30%", marginTop:"10%" ,fontSize:"14px"}}> copyright 2022 &#169;</p>
          </Drawer>
            
            <Main  open={open}>
              {children}
            </Main>
           
            
            </Box>
      
  );
}

