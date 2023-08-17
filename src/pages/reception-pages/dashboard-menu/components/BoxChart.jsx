import { Grid, Paper } from "@mui/material";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";
import { Typography, Box } from "@mui/material";

export function BoxChart({ children }) {
  return (
    <Paper
      sx={{
        backgroundImage: `url(${BackgroundPages})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}

export function BoxChartMin({ title, subtitle, icon, color, gradient }) {
  return (
    <Grid container sx={{ maxHeight: "200px" }}>
      <Grid item xs={12}>
        <Typography variant="h1" sx={{ color: color }}>
          {title}
        </Typography>
        <Typography variant="h2" sx={{ display: "flex", alignItems: "center" }}>
          {subtitle} {icon}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundColor: color,
            width: "100%",
            height: "30px",
            marginTop: "2%",
            borderRadius: "3px",
            background: gradient
          }}
        ></Box>
      </Grid>
    </Grid>
  );
}
