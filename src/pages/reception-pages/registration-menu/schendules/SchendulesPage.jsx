import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";
import { SchendulesForm } from "../components/SchendulesForm";
import { SideBarMenu } from "../../../../shared/components/reception-components/sidebar-menu/SideBarMenu";
export function SchendulesPage() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={10.6}>
        <Paper
          elevation={5}
          sx={{
            backgroundImage: `url(${BackgroundPages})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                noWrap
                component="span"
                sx={{ padding: "2%" }}
              >
                Agendamentos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SchendulesForm />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={1.35}>
        <SideBarMenu typePage="movimentos" idPage=":idMove" formRef={"sa"} />
      </Grid>
    </Grid>
  );
}
