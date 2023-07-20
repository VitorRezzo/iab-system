import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ApiServer from "../../../services/ApiServer";
import Cookies from "js-cookie";
import moment from "moment";
import {
  PieCharts,
  LineCharts,
  FluxPatiensCharts,
  ColumnCharts
} from "./components/Charts";

export function DashboardPage() {
  const [pieResidents, setPieResidents] = useState();
  const [columnResidents, setColumnResidents] = useState();
  const [lineMoviments, setLineMoviments] = useState();

  const countAllResidentsByGender = async () => {
    await ApiServer.get("/count-allresidents-bygender", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setPieResidents(response.data);
    });
  };

  const countAllPathologysPatients = async () => {
    await ApiServer.get("/count-allpathologys-patients", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setColumnResidents(response.data);
    });
  };

  const listPricesMoviementsResidents = async () => {
    const date = new Date();
    let startdate = moment(date).format("YYYY-MM-") + "01";
    let enddate = moment(date).format("YYYY-MM-") + "31";

    await ApiServer.post(
      "/list-pricesmovements-residents",
      { startdate: startdate, enddate: enddate },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setLineMoviments(response.data);
    });
  };

  useEffect(() => {
    countAllResidentsByGender();
    countAllPathologysPatients();
    listPricesMoviementsResidents();
  }, []);
  return (
    <Box>
      <Grid container sx={{ marginTop: "0.5%" }} maxWidth="lg" spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <PieCharts value={pieResidents} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LineCharts value={lineMoviments} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ColumnCharts value={columnResidents} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FluxPatiensCharts />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
