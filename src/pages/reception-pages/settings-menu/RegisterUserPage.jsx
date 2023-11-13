import React from "react";
import { Paper, Box, TextField, Button } from "@mui/material";
import ApiServer from "../../../services/ApiServer.js";
import BackgroundPages from "../../../assets/img/BackgroundPages.svg";
export function RegisterUserPage() {
  const Cadastrar = async (e) => {
    e.preventDefault();

    await ApiServer.post("/register-user", {
      fullname: "Admin Rezzo",
      username: e.target.usuario.value,
      password: e.target.senha.value
    })
      .then(() => {
        alert("Usuario cadastrado com sucesso!");
      })
      .catch(() => {
        alert("Fala ao cadastrar usuario!");
      });
  };

  return (
    <Paper
      elevation={5}
      sx={{
        backgroundImage: `url(${BackgroundPages})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Box
        component="div"
        sx={{ display: "flex", flexDirection: "row", minHeight: "400px" }}
      >
        <Box
          component="form"
          onSubmit={Cadastrar}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            type="text"
            name="usuario"
            label="Usuario"
            variant="outlined"
          />
          <TextField
            type="password"
            name="senha"
            label="Senha"
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
