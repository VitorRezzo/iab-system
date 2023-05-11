import { useState } from "react";
import { styled } from "@mui/material/styles";
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
import Mensageiro from "./Mensageiro.js";
import Cookies from "js-cookie";
import FundoP from "../../../assets/img/FundoP.jpg";
import { useAutenticaUser } from "../../../context/AutenticaUser.jsx";
import { Tooltip } from "@mui/material";
let drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    })
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export function Drawer_Aco({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
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
    setOpen(true);
    drawerWidth = 240;
  };

  const handleDrawerClose = () => {
    setOpen(false);
    drawerWidth = 55;
  };

  const logoutUsers = () => {
    Cookies.remove(process.env.REACT_APP_TOKEN, { path: "" });
    navigate("/");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "25px",
          width: "100%"
        }}
      >
        <Typography
          color="primary"
          sx={{ marginLeft: open ? "16%" : "5%", flex: "5" }}
          component={"span"}
          variant={"body2"}
        >
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
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
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
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            overflow: "hidden",
            backgroundImage: `url(${FundoP})`,
            backgroundSize: "cover",
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <DrawerHeader>
          <IconButton
            onClick={() => (open ? handleDrawerClose() : handleDrawerOpen())}
          >
            <MenuOpenIcon />
          </IconButton>
        </DrawerHeader>
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

        {open ? <Mensageiro /> : <div />}
      </Drawer>

      <Main open={open}>{children}</Main>
    </Box>
  );
}
