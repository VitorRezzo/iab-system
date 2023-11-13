import React from "react";
import BackgroundMenu from "../../../../assets/img/BackgroundMenu.svg";
import SaveIcon from "@mui/icons-material/Save";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Button, Box, Paper, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function SideBarMenu(props) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    props.formRef?.current?.submitForm();
  };
  const handleNewPage = () => {
    navigate(`/cadastro/${props.typePage}/${props.idPage}`);
    navigate(0);
  };

  return (
    <Paper
      sx={{
        backgroundImage: `url(${BackgroundMenu})`,
        backgroundSize: "cover",
        height: "300px",
        width: "100%",
        marginTop: "6%"
      }}
      elevation={1}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <Typography sx={{ color: "#FFF" }}>Menu</Typography>
        <Button
          color="warning"
          variant="contained"
          onClick={() => handleSubmit()}
          sx={{
            marginTop: "10%",
            width: "95%",
            color: "#fff",
            fontSize: "0.9rem"
          }}
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
        {props.typePage !== "acompanhante" ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleNewPage();
            }}
            sx={{ width: "95%", color: "#fff", fontSize: "0.9rem" }}
            startIcon={<InsertDriveFileOutlinedIcon />}
          >
            Novo
          </Button>
        ) : null}

        <IconButton sx={{ marginTop: "80%", color: "#fff" }}>
          <KeyboardBackspaceOutlinedIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
