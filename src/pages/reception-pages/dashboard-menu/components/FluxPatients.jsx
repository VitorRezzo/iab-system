import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
export function FluxPatients() {
  const listPat = [
    { name: "Ana Paula" },
    { name: "Renato Lima" },
    { name: "Lili kera" },
    { name: "Pablo tura" },
    { name: "Jura lima" },
    { name: "Pablo tura" }
  ];

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {listPat.map((dados, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary={dados.name} />
        </ListItem>
      ))}
    </List>
  );
}
