import { Box, Paper, Typography } from "@mui/material";
import { TableModel } from "./components/TableModel";
import TexturaPran from "../../../assets/img/TexturaPran.jpg";

export function ReportPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%"
      }}
    >
      <Paper
        sx={{
          padding: "2%",
          width: "80%",
          backgroundImage: `url(${TexturaPran})`,
          marginTop: "2%"
        }}
        elevation={5}
      >
        <Typography
          sx={{ color: "#085A8C", marginLeft: "2%", paddingBottom: "10%" }}
          variant="h4"
          noWrap
          component="div"
        >
          Relatórios
        </Typography>
        <TableModel name="Pacientes" color="#038bbb" />
        <TableModel name="Acompanhantes" color="#0a6789" />
        <TableModel name="Movimentos" color="#152b3c" />
        <TableModel name="Despesas" color="#03223f" />
      </Paper>
    </Box>
  );
}
