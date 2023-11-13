import { Grid } from "@mui/material";
import {
  PieCharts,
  LineCharts,
  FluxResidentCharts,
  ColumnCharts,
  ExpenseCharts,
  CuredCharts,
  DeadCharts,
  TreemapCharts,
  TotalResidentsCharts,
  EnterTodayCharts,
  ExitTodayCharts,
  InpatientCharts
} from "./components/Charts";

export function DashboardPage() {
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} sm={5}>
        <PieCharts />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TotalResidentsCharts />
          </Grid>
          <Grid item xs={12} sm={6}>
            <EnterTodayCharts />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ExitTodayCharts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CuredCharts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DeadCharts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InpatientCharts />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ExpenseCharts />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12}>
        <ColumnCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TreemapCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <LineCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FluxResidentCharts />
      </Grid>
    </Grid>
  );
}
