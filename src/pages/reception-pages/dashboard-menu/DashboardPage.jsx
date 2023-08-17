import { Grid } from "@mui/material";
import {
  PieCharts,
  LineCharts,
  FluxPatiensCharts,
  ColumnCharts,
  ExpenseCharts,
  CuredCharts,
  DeadCharts,
  TreemapCharts
} from "./components/Charts";

export function DashboardPage() {
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} sm={4}>
        <CuredCharts />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DeadCharts />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ExpenseCharts />
      </Grid>
      <Grid item xs={12} sm={5}>
        <PieCharts />
      </Grid>
      <Grid item xs={12} sm={7}>
        <ColumnCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TreemapCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <LineCharts />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FluxPatiensCharts />
      </Grid>
    </Grid>
  );
}
