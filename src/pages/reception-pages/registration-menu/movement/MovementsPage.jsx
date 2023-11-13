import { useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import BackgroundPages from "../../../../assets/img/BackgroundPages.svg";
import { MovementsTable } from "../components/MovementsTable";
import { ResidentForm } from "../components/ResidentForm";

import {
  setStateMoveForm,
  setResidentData,
  setIsChecked
} from "../../../../shared/redux/slices/MovementPageSlice";
import { useDispatch } from "react-redux";
import { SideBarMenu } from "../../../../shared/components/reception-components/sidebar-menu/SideBarMenu";
export function MovementsPage() {
  const dispattch = useDispatch();

  useEffect(() => {
    return () => {
      dispattch(setIsChecked(null));
      dispattch(setStateMoveForm({}));
      dispattch(setResidentData(null));
    };
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={10.6}>
        <Paper
          elevation={5}
          sx={{
            backgroundImage: `url(${BackgroundPages})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            padding: "2%"
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h1" noWrap component="span">
                Movimentação
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <ResidentForm />
            </Grid>
            <Grid item xs={12}>
              <MovementsTable />
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
