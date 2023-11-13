import { useState } from "react";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FeedIcon from "@mui/icons-material/Feed";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import {
  Grid,
  Drawer,
  Box,
  List,
  Divider,
  IconButton,
  Collapse
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Mensageiro from "./Mensageiro.jsx";
import BackgroundMenu from "../../../../assets/img/BackgroundMenu.svg";
import { useMediaQuery, useTheme } from "@mui/material";
import { MenuHeader } from "./MenuHeader.jsx";
import { ListMenuDrawer } from "./ListMenuDrawer.jsx";

export function MenuDrawer({ children }) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const SIZEDRAWER = 240;

  const [drawerWidth, setDraweWidth] = useState(SIZEDRAWER);
  const [bntopen, setBntOpen] = useState(null);

  const handleButtonClick = (value) => {
    setBntOpen(bntopen ? null : value);
  };

  const handleDrawerOpen = () => {
    setDraweWidth(SIZEDRAWER);
  };

  const handleDrawerClose = () => {
    setDraweWidth(55);
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
              transition: "width .35s ease-in-out",
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
          <Box
            sx={{
              display: "grid",
              placeContent: drawerWidth === SIZEDRAWER ? "flex-end" : "center"
            }}
          >
            <IconButton
              onClick={() =>
                drawerWidth === SIZEDRAWER
                  ? handleDrawerClose()
                  : handleDrawerOpen()
              }
            >
              {drawerWidth === SIZEDRAWER ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListMenuDrawer
              text="Dashboard"
              component={NavLink}
              to={"/Acolhimento_dashboard"}
              startIcon={<DashboardIcon sx={{ color: "#0066FC" }} />}
            />

            <ListMenuDrawer
              text="Cadastro"
              action={() => {
                handleButtonClick(1);
              }}
              startIcon={<ContactPageIcon sx={{ color: "#02E5B4" }} />}
              endIcon={bntopen === 1 ? <ExpandLess /> : <ExpandMore />}
            />
            <Collapse in={bntopen === 1} timeout="auto">
              <List
                sx={{
                  background: "#2176e0"
                }}
                component="div"
                disablePadding
              >
                <ListMenuDrawer
                  text="Paciente"
                  component={NavLink}
                  to={"/cadastro/paciente/:idPatient"}
                  startIcon={<PersonIcon sx={{ color: "#092b5a" }} />}
                />
                <ListMenuDrawer
                  text="Agendamentos"
                  component={NavLink}
                  to={"/cadastro/agendamentos"}
                  startIcon={<EventNoteIcon sx={{ color: "#092b5a" }} />}
                />
                <ListMenuDrawer
                  text="Movimentação"
                  component={NavLink}
                  to={"/cadastro/movimentos/:idMove"}
                  startIcon={<SyncAltIcon sx={{ color: "#092b5a" }} />}
                />
              </List>
            </Collapse>

            <ListMenuDrawer
              text="Relatórios"
              component={NavLink}
              to={"/relatorios"}
              startIcon={<FeedIcon sx={{ color: "#F2485B" }} />}
            />
            <ListMenuDrawer
              text="Gráficos"
              component={NavLink}
              to={"/graficos"}
              startIcon={<AssessmentIcon sx={{ color: "#F38900" }} />}
            />
            <ListMenuDrawer
              text="Configurações"
              action={() => {
                handleButtonClick(2);
              }}
              startIcon={<SettingsIcon sx={{ color: "#383939" }} />}
              endIcon={bntopen === 2 ? <ExpandLess /> : <ExpandMore />}
            />
            <Collapse in={bntopen === 2} timeout="auto">
              <List
                sx={{
                  background: "#2176e0"
                }}
                component="div"
                disablePadding
              >
                <ListMenuDrawer
                  text="Usuários"
                  component={NavLink}
                  to={"/configura/usuarios"}
                  startIcon={<ManageAccountsIcon sx={{ color: "#092b5a" }} />}
                />

                <ListMenuDrawer
                  text="Formulários"
                  component={NavLink}
                  to={"#"}
                  startIcon={<ContentPasteIcon sx={{ color: "#092b5a" }} />}
                />
              </List>
            </Collapse>

            <ListMenuDrawer
              text="Sobre"
              component={NavLink}
              to={"#"}
              startIcon={<InfoIcon sx={{ color: "#7D6B7D" }} />}
            />
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
            <MenuHeader />
          </Grid>
          <Grid item xs={12}>
            <main style={{ paddingRight: "0.5%" }}>{children}</main>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
