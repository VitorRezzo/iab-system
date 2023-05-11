import React, { useRef, useState } from "react";
import { Box, Button, Radio, Typography, Grid } from "@mui/material";
import BrunnoLogo from "../../assets/img/BrunnoLogo.png";
import FundoP from "../../assets/img/FundoP.jpg";
import ApiServer from "../../services/ApiServer.js";
import Cookies from "js-cookie";
import { VTextField } from "../../shared/components/form-unform/VTextField.tsx";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";

const MIABESTOQUE = "IAB ESTOQUE";
const MIABACOLHIMENTO = "IAB ACOLHIMENTO";

export function LoginPage({ children }) {
  const url = window.location.pathname;
  const formRef = useRef(null);
  const [selectedModule, setSelectedModule] = useState(MIABACOLHIMENTO);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setSelectedModule(event.target.value);
  };
  const LoginUsuario = async (v) => {
    await ApiServer.post("/login-user", {
      username: v.user,
      password: v.pass
    }).then((response) => {
      if (response.data.auth) {
        Cookies.set(process.env.REACT_APP_TOKEN, response.data.token);
        localStorage.setItem("--auth", response.data.auth);
        localStorage.setItem("--username", response.data.username);
        navModule();
      } else {
        localStorage.setItem("--auth", false);
        alert(response.data.message);
      }
    });
  };

  const navModule = () => {
    if (selectedModule === MIABACOLHIMENTO) {
      navigate("/Acolhimento_dashboard");
    } else {
      navigate("/Acolhimento_dashboard");
    }
  };

  if (url !== "/") return <>{children}</>;

  return (
    <Box
      component="div"
      sx={{
        justifyContent: "center",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "340px",
          borderRadius: "10px",
          backgroundImage: `url(${FundoP})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <img
              src={BrunnoLogo}
              style={{
                height: "340px",
                marginTop: "-0.8%",
                width: "90%",
                borderRadius: "10px",
                border: "2px solid #FFF"
              }}
              alt="imagem Brunno no login"
            />
          </Grid>
          <Grid item xs={6}>
            <Form
              ref={formRef}
              onSubmit={(data) => {
                LoginUsuario(data);
              }}
            >
              <Typography variant="h4" sx={{ color: "#FFFF", marginTop: "3%" }}>
                Faça seu Login!
              </Typography>
              <Box sx={{ marginTop: "10%" }}>
                <VTextField
                  name="user"
                  label="Usuario"
                  color="#FFF"
                  sx={{ width: "80%" }}
                />
                <VTextField
                  name="pass"
                  label="Senha"
                  color="#FFF"
                  type="password"
                  sx={{ width: "80%" }}
                />
                <Grid container sx={{ marginTop: "5%" }}>
                  <Grid item xs={6}>
                    <Radio
                      checked={selectedModule === MIABACOLHIMENTO}
                      onChange={handleChange}
                      value={MIABACOLHIMENTO}
                      sx={{
                        color: "info",
                        "&.Mui-checked": {
                          color: "#3ec9a7"
                        }
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="label"
                      sx={{ color: "#3ec9a7" }}
                    >
                      ACOLHIMENTO
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Radio
                      checked={selectedModule === MIABESTOQUE}
                      onChange={handleChange}
                      value={MIABESTOQUE}
                      sx={{
                        color: "info",
                        "&.Mui-checked": {
                          color: "#0e0036"
                        }
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      component="label"
                      sx={{ color: "#000039" }}
                    >
                      ESTOQUE
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      sx={{
                        marginLeft: "20%",
                        marginTop: "6%",
                        width: "200px"
                      }}
                      color={"info"}
                      variant="contained"
                      type="submit"
                    >
                      Acessar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
