import React, { useState } from "react";
import BrunnoAvatar from "../../../../assets/img/BrunnoAvatar.gif";
import { Typography, Tooltip } from "@mui/material/";
import Zoom from "@mui/material/Zoom";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useAutenticaUser } from "../../../context/AutenticaUser";

export default function Mensageiro() {
  const [open, setOpen] = useState(true);
  const { userLog } = useAutenticaUser();
  let titulo;
  let mensagem;

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  switch (window.location.pathname) {
    case "/Acolhimento_dashboard":
      titulo = "Bem vindo  " + userLog;
      mensagem =
        "Esse é o Menu Dashboard voçê pode acompanhar os dados dos moradores nos gráficos";
      break;
    case "/cadastro/paciente/:idP":
      titulo = "Menu Cadastro";
      mensagem =
        "Para adcionar um novo Paciente e Acompanhantes preencha os campos!     ";
      break;
    case "/cadastro/acompanhante/":
      titulo = "Menu Cadastro";
      mensagem =
        "Para adcionar um novo Paciente e Acompanhantes preencha os campos!     ";
      break;
    case "/relatorios":
      titulo = "Menu Relatorio";
      mensagem =
        "Você pode gerar seu relatorio em pdf ,filtrar e imprimir ,Escolha uma ficha clicando.";
      break;
    default:
      titulo = "Bem vindo";
      mensagem = "O Instituto esta de portas abertas";
      break;
  }

  return (
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
        title={
          <React.Fragment>
            <Typography color="inherit">{titulo}</Typography>
            <p>{mensagem}</p>
          </React.Fragment>
        }
      >
        <img
          src={BrunnoAvatar}
          onClick={handleTooltipOpen}
          style={{
            position: "absolute",
            bottom: "0",
            marginLeft: "40px",
            paddingBottom: "10px",
            width: "140px",
            height: "140px"
          }}
          alt="Brunno Desenho"
        />
      </Tooltip>
    </ClickAwayListener>
  );
}
