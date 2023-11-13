import {
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon
} from "@mui/material";

export const ListMenuDrawer = ({
  component,
  to,
  action,
  text,
  startIcon,
  endIcon
}) => {
  return (
    <ListItem sx={{ color: "#FFF" }} disablePadding>
      <ListItemButton component={component} to={to} onClick={action}>
        <ListItemIcon>{startIcon}</ListItemIcon>
        <ListItemText primary={text}></ListItemText>
        <ListItemIcon sx={{ color: "#FFF", paddingLeft: "60%" }}>
          {endIcon}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};
