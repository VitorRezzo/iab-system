import {
  Box,
  IconButton,
  Typography,
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAutenticaUser } from "../../../context/AutenticaUser.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
export const MenuHeader = () => {
  const { userLog } = useAutenticaUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUsers = () => {
    Cookies.remove(process.env.REACT_APP_TOKEN, { path: "" });
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        flexDirection: "row",
        height: "25px",
        paddingTop: "0.5%",
        width: "100%"
      }}
    >
      <Avatar
        src={""}
        sx={{
          width: "28px",
          height: "28px",
          marginRight: "0.2%"
        }}
      />
      <Typography color="#0aabba" variant="h4">
        Bem vindo , <b>{userLog}</b>
      </Typography>
      <IconButton
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",

            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 25,
              height: 25,
              ml: -0.5,
              mr: 1
            }
          }
        }}
      >
        <MenuItem onClick={() => logoutUsers()}>
          <Avatar src={""} />
          <Typography variant="h5">Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={() => logoutUsers()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};
