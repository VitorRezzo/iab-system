import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Divider, ListItemIcon } from "@mui/material";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
export function FluxPatients() {
  const listPat = [
    {
      name: "Ana Paula",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Renato Lima",
      status: "Na Casa",
      type: "Retorno",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Lili kera",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Pablo tura",
      status: "Exame",
      type: "Quimio",
      color: "#fecd23",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Jura lima",
      status: "Internado",
      type: "Internação",
      color: "#bd3737",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Pablo tura",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    }
  ];

  return (
    <List sx={{ width: "100%" }}>
      {listPat.map((dados, index) => (
        <ListItem key={index}>
          <ListItemAvatar sx={{ width: "100px" }}>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary={dados.name} sx={{ width: "100px" }} />
          <ListItemText primary={dados.status} />
          <ListItemIcon sx={{ width: "100px" }}>
            <MultipleStopIcon
              sx={{
                color: dados.color
              }}
            />
          </ListItemIcon>
          <ListItemText primary={dados.type} sx={{ width: "100px" }} />
          <ListItemText primary={dados.data} sx={{ width: "100px" }} />
          <Divider sx={{ color: "blue" }} />
        </ListItem>
      ))}
    </List>
  );
}
