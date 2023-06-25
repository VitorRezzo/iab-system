import { Box, Paper, Typography } from "@mui/material";
import { TableModel } from "./components/TableModel";
import BackgroundPages from "../../../assets/img/BackgroundPages.svg";

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
          backgroundImage: `url(${BackgroundPages})`,
          marginTop: "2%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        elevation={5}
      >
        <Typography
          sx={{ marginLeft: "2%", paddingBottom: "10%" }}
          variant="h1"
          noWrap
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
