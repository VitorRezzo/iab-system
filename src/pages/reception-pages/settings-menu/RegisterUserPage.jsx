import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import ApiServer from "../../../services/ApiServer.js";

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
    <Container
      sx={{
        display: "flex",
        marginTop: "8%",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        width: "90vw"
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
    </Container>
  );
}