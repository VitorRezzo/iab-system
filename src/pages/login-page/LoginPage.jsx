import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Radio,
  Typography,
  Grid,
  Modal,
  Paper
} from "@mui/material";
import BrunnoLogo from "../../assets/img/BrunnoLogo.svg";
import BackgroundMenu from "../../assets/img/BackgroundMenu.svg";
import ApiServer from "../../services/ApiServer.js";
import Cookies from "js-cookie";
import { VTextField } from "../../shared/components/form-unform/VTextField.tsx";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import BackgroundPages from "../../assets/img/BackgroundPages.svg";
const MIABESTOQUE = "IAB ESTOQUE";
const MIABACOLHIMENTO = "IAB ACOLHIMENTO";

export function LoginPage({ children }) {
  const theme = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLandScapeScreen = useMediaQuery(
    theme.breakpoints.between("sm", "md")
  );

  const url = window.location.pathname;
  const [selectedModule, setSelectedModule] = useState(MIABACOLHIMENTO);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const Login = async (data) => {
    await ApiServer.post("/login-user", {
      username: data.user,
      password: data.pass
    })
      .then((response) => {
        if (response.data.auth) {
          Cookies.set(process.env.REACT_APP_TOKEN, response.data.token);
          localStorage.setItem("--auth", response.data.auth);
          localStorage.setItem("--username", response.data.username);
          setIsOpenModal(true);
        }
      })
      .catch((error) => {
        localStorage.setItem("--auth", false);
        alert(error.response.data.message);
      });
  };

  const navModule = () => {
    if (selectedModule === MIABACOLHIMENTO) {
      navigate("/Acolhimento_dashboard");
    } else {
      navigate("/Acolhimento_dashboard");
    }
    setIsOpenModal(false);
  };

  if (url !== "/") return <>{children}</>;

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: isLandScapeScreen ? "500px" : "600px",
          maxHeight: isSmallScreen ? "500px" : "255px",
          padding: "2%",
          borderRadius: "10px",
          backgroundImage: `url(${BackgroundMenu})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Grid container spacing={0.5}>
          <Grid item xs={12} sm={6}>
            <img
              src={BrunnoLogo}
              style={{
                width: "100%",
                marginTop: isSmallScreen ? "0%" : "-5%",
                marginLeft: isSmallScreen ? "2%" : "-5%",
                height: isSmallScreen ? "82%" : "100%",
                maxHeight: "325px"
              }}
              alt="imagem Brunno no login"
            />
          </Grid>
          <Grid item xs={12} marginTop={isSmallScreen ? "-15%" : "-2%"} sm={6}>
            <Form
              ref={formRef}
              onSubmit={(data) => {
                Login(data);
              }}
            >
              <Grid
                container
                marginTop={isLandScapeScreen ? "5%" : "2%"}
                sx={{
                  borderRadius: "10px",

                  boxShadow: "0 8px 40px 0 #0044ff",
                  marginBottom: "3%",
                  width: "95%",
                  marginLeft: "3%"
                }}
                spacing={2}
              >
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "#bdd1de",
                      whiteSpace: "nowrap",
                      fontSize: isSmallScreen
                        ? "16px"
                        : isLandScapeScreen
                        ? "16px"
                        : "28px"
                    }}
                  >
                    Faça seu Login!
                  </Typography>
                </Grid>
                <Grid item xs={11.5}>
                  <VTextField
                    name="user"
                    label="Usuario"
                    color="#FFF"
                    variant="standard"
                    size="small"
                  />
                </Grid>
                <Grid item xs={11.5}>
                  <VTextField
                    name="pass"
                    label="Senha"
                    color="#FFF"
                    type="password"
                    variant="standard"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{
                      marginTop: isSmallScreen ? "2%" : "25%",
                      marginLeft: isSmallScreen ? "0%" : "50%",
                      width: "100%",
                      marginBottom: "4%",
                      color: "#bdd1de",
                      ":hover": {
                        background: "#092b5a",
                        color: "#00fff2"
                      }
                    }}
                    onClick={() => formRef.current?.submitForm()}
                  >
                    Acessar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
        <Modal
          open={isOpenModal}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Paper
            sx={{
              width: "90%",
              maxWidth: "400px",
              height: "200px",
              padding: "2%",
              backgroundImage: `url(${BackgroundPages})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
            elevation={2}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography
                  variant="h2"
                  component="span"
                  sx={{
                    color: "#000039",

                    fontSize: isSmallScreen
                      ? "18px"
                      : isLandScapeScreen
                      ? "18px"
                      : "26px"
                  }}
                >
                  Escolha um Ambiente!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Radio
                  checked={selectedModule === MIABACOLHIMENTO}
                  onChange={handleChange}
                  value={MIABACOLHIMENTO}
                  sx={{
                    "&.Mui-checked": {
                      color: "#0abfbc"
                    }
                  }}
                  size="small"
                />
                <Typography
                  variant="h4"
                  component="span"
                  sx={{
                    color: "#000039",
                    fontSize: isSmallScreen
                      ? "12px"
                      : isLandScapeScreen
                      ? "12px"
                      : "18px"
                  }}
                >
                  ACOLHIMENTO
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Radio
                  checked={selectedModule === MIABESTOQUE}
                  onChange={handleChange}
                  value={MIABESTOQUE}
                  sx={{
                    "&.Mui-checked": {
                      color: "#0abfbc"
                    }
                  }}
                  size="small"
                />
                <Typography
                  variant="h4"
                  component="span"
                  sx={{
                    color: "#000039",
                    fontSize: isSmallScreen
                      ? "12px"
                      : isLandScapeScreen
                      ? "12px"
                      : "18px"
                  }}
                >
                  ESTOQUE
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "8%"
                }}
              >
                <Button
                  onClick={() => setIsOpenModal(false)}
                  variant="contained"
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    navModule();
                  }}
                >
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </Box>
    </Box>
  );
}
