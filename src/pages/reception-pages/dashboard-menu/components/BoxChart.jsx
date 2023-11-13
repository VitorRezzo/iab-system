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

export function BoxChartMin({
  title,
  subtitle,
  icon,
  color,
  gradient,
  variant
}) {
  return (
    <Paper
      sx={{
        backgroundImage: `url(${BackgroundPages})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.1)"
        }
      }}
      elevation={3}
    >
      <Grid container spacing={0.5}>
        <Grid item xs={12} />
        <Grid item xs={2} />
        <Grid item xs={7}>
          <Typography
            variant={variant ? variant : "h3"}
            sx={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "5px",
              fontWeight: "700"
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {icon}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          width: "100%",
          height: "25px",
          marginTop: "3%",
          transition: "all 0.3s",

          borderRadius: "3px",
          background: gradient
        }}
      >
        <Typography variant="h5" color="#e1e6e3" sx={{}}>
          {subtitle}
        </Typography>
      </Box>
    </Paper>
  );
}
