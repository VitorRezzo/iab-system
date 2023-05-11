import { Box, Paper, Typography } from "@mui/material";
import { RTBPaper } from "./components/RTBPaper";
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
        <RTBPaper name="Pacientes" color="#038bbb" />
        <RTBPaper name="Acompanhantes" color="#0a6789" />
        <RTBPaper name="Movimentos" color="#152b3c" />
        <RTBPaper name="Despesas" color="#03223f" />
      </Paper>
    </Box>
  );
}
