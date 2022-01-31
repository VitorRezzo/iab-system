import React from "react";
import imgdesenhIAB from "../../../assets/img/imgdesenhIAB.gif"
import {Typography,Tooltip} from '@mui/material/'
import Zoom from '@mui/material/Zoom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useAutenticaUser} from "../../../store/AutenticaUser.js"

export default function Mensageiro () {
const [open, setOpen] = React.useState(true);
let {userLog} = useAutenticaUser();
let titulo;
let mensagem;

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  switch (window.location.pathname){
      case "/Acolhimento":
          titulo = "Bem vindo  "+ userLog;
          mensagem = "Nessa tela voçê pode acompanhar os usuários cadastrados atraves dos gráficos";
          break;
          case "/CadastroAco":
            titulo = "Menu Cadastro";
            mensagem = "Para adcionar o novo morador preencha os campos    ";
            break;
            case "/RelatorioAco":
            titulo = "Menu Relatorio";
            mensagem = "Você pode gerar seu realtorio em pdf ou imprimir ,pesquise o nome e edita.";
            break;
         default:
          titulo="Bem vindo"
          mensagem = "Vamos adcionar um novo morador,O Instituto esta de portas abertas"
          break;
  }


return(
    <ClickAwayListener onClickAway={handleTooltipClose}>
    <Tooltip   
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener 
                TransitionComponent={Zoom} 
                placement="right-start"
                arrow
    title={<React.Fragment>
                <Typography color="inherit">{titulo}</Typography>
                                    <p>{mensagem}</p>
    </React.Fragment>}> 
     
 <img src={imgdesenhIAB} onClick={handleTooltipOpen}   style={{display:"block",marginTop:"95%", marginLeft:"20%", width:"140px",height:"140px"}} alt="Brunno Desenho" />    
 </Tooltip>
 </ClickAwayListener>
 

)


}


 