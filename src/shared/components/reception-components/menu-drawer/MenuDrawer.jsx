import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FeedIcon from "@mui/icons-material/Feed";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavigationAco from "./NavigationAco.js";
import { useNavigate } from "react-router-dom";
import Mensageiro from "./Mensageiro.jsx";
import Cookies from "js-cookie";
import BackgroundMenu from "../../../../assets/img/BackgroundMenu.svg";
import { useAutenticaUser } from "../../../context/AutenticaUser.jsx";
import { Grid, Tooltip } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
export function MenuDrawer({ children }) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const SIZEDRAWER = 240;
  const navigate = useNavigate();
  const [drawerWidth, setDraweWidth] = useState(SIZEDRAWER);
  const [bntopen, setBntOpen] = useState(0);
  const { userLog } = useAutenticaUser();

  const handlerButtonClick = (value) => {
    switch (value) {
      case 1:
        setBntOpen(bntopen ? null : value);
        break;
      case 3:
        setBntOpen(bntopen ? null : value);
        break;
      default:
        setBntOpen(0);
        break;
    }
  };

  const handleDrawerOpen = () => {
    setDraweWidth(SIZEDRAWER);
  };

  const handleDrawerClose = () => {
    setDraweWidth(55);
  };

  const logoutUsers = () => {
    Cookies.remove(process.env.REACT_APP_TOKEN, { path: "" });
    navigate("/");
  };

  return (
    <Grid container>
      <Grid
        item
        xs={drawerWidth === SIZEDRAWER ? 2 : isSmallScreen ? 1.8 : 0.5}
      >
        <Drawer
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflow: "hidden",
              backgroundImage: `url(${BackgroundMenu})`,
              backgroundSize: "cover",
              boxSizing: "border-box"
            }
          }}
          variant="persistent"
          anchor="left"
          open={true}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() =>
                drawerWidth == SIZEDRAWER
                  ? handleDrawerClose()
                  : handleDrawerOpen()
              }
            >
              <MenuOpenIcon />
            </IconButton>
          </Box>
          <Divider />
          <List
            sx={{
              color: "#FFFF"
            }}
          >
            <ListItem button onClick={() => NavigationAco(0, navigate)}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#0066FC" }} />
              </ListItemIcon>
              <ListItemText primary={open ? "Dashboard" : null} />
            </ListItem>
            <ListItem button onClick={() => handlerButtonClick(1)}>
              <ListItemIcon>
                <ContactPageIcon sx={{ color: "#02E5B4" }} />
              </ListItemIcon>
              <ListItemText primary={"Cadastro"} />
              {bntopen === 1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={bntopen === 1} timeout="auto">
              <List
                sx={{
                  background: "#2176e0"
                }}
                component="div"
                disablePadding
              >
                <ListItem button onClick={() => NavigationAco(1, navigate)}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "#092b5a" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Paciente"} />
                </ListItem>
                <ListItem button onClick={() => NavigationAco(3, navigate)}>
                  <ListItemIcon>
                    <SyncAltIcon sx={{ color: "#092b5a" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Movimentação"} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => NavigationAco(4, navigate)}>
              <ListItemIcon>
                <FeedIcon sx={{ color: "#F2485B" }} />
              </ListItemIcon>
              <ListItemText primary={"Relatório"} />
            </ListItem>
            <ListItem button onClick={() => NavigationAco(5, navigate)}>
              <ListItemIcon>
                <AssessmentIcon sx={{ color: "#F38900" }} />
              </ListItemIcon>
              <ListItemText primary={"Gráficos"} />
            </ListItem>
            <ListItem button onClick={() => handlerButtonClick(3)}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#383939" }} />
              </ListItemIcon>
              <ListItemText primary={"Configuração"} />
              {bntopen === 3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={bntopen === 3} timeout="auto">
              <List
                sx={{
                  background: "#2176e0"
                }}
                component="div"
                disablePadding
              >
                <ListItem button>
                  <ListItemIcon>
                    <ManageAccountsIcon sx={{ color: "#092b5a" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Usuário"} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SettingsSuggestIcon sx={{ color: "#092b5a" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Tema"} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon sx={{ color: "#7D6B7D" }} />
              </ListItemIcon>
              <ListItemText primary={"Sobre"} />
            </ListItem>
          </List>

          <Divider />

          {drawerWidth === SIZEDRAWER ? <Mensageiro /> : null}
        </Drawer>
      </Grid>
      <Grid
        item
        xs={drawerWidth === SIZEDRAWER ? 10 : isSmallScreen ? 10.2 : 11.4}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "25px",
                width: "100%"
              }}
            >
              <Typography color="primary" component={"span"} variant={"body2"}>
                IAB ACOLHIMENTO
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flex: "1",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                  component={"span"}
                  variant={"body2"}
                >
                  <Avatar
                    src={""}
                    sx={{
                      width: "28px",
                      height: "28px",
                      marginRight: "10%"
                    }}
                  />
                  {userLog}
                </Typography>

                <IconButton onClick={() => logoutUsers()}>
                  <Tooltip title="Sair">
                    <LogoutIcon color="primary" />
                  </Tooltip>
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <main style={{ paddingRight: "0.5%" }}>{children}</main>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
