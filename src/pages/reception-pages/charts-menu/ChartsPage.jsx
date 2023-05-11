import React, { useState, useRef } from "react";

import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  IconButton
} from "@mui/material";

import TexturaPran from "../../../assets/img/TexturaPran.jpg";
import FundoP from "../../../assets/img/FundoP.jpg";

import SaveIcon from "@mui/icons-material/Save";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import { TypeCharts } from "./components/TypeCharts";
import ListGraficos from "../../../constants/ListGraficos.json";

import { VAutoComplete } from "../../../shared/components/form-unform/VAutoComplete.tsx";
import { VDatePick } from "../../../shared/components/form-unform/VDatePick.tsx";

import { Form } from "@unform/web";

import ApiServer from "../../../services/ApiServer";
import Cookies from "js-cookie";

export function ChartsPage() {
  const [typegraph, setTypeGraph] = useState("");
  const [countgraph, setCountGraph] = useState("");
  const formRef = useRef(null);

  const FilterGraph = async (type) => {
    setTypeGraph(type.graph);
    await ApiServer.post(
      "/filter-graph-bytype",
      { type: type.graph, startdate: type.startdate, enddate: type.enddate },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then(async (res) => {
      setCountGraph(res.data);
    });
  };

  return (
    <Box sx={{ padding: "2%", marginLeft: "2%", marginTop: "-2%" }}>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Paper
            sx={{
              padding: "2%",
              width: "95%",
              height: "600px",
              backgroundImage: `url(${TexturaPran})`,
              marginTop: "2%"
            }}
            elevation={5}
          >
            <Form
              ref={formRef}
              onSubmit={(data) => {
                FilterGraph(data);
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <VAutoComplete
                    name="graph"
                    labels="Escolha um Gráfico!"
                    variant="filled"
                    option={ListGraficos}
                  />
                </Grid>
                <Grid item xs={2.2}>
                  <VDatePick
                    name="startdate"
                    variants="outlined"
                    sizes="small"
                    labels="Incio"
                  />
                </Grid>
                <Grid item xs={2.2}>
                  <VDatePick
                    name="enddate"
                    variants="outlined"
                    sizes="small"
                    labels="Fim"
                  />
                </Grid>
              </Grid>
            </Form>
            <TypeCharts type={typegraph} value={countgraph} />
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper
            sx={{
              position: "fixed",
              backgroundImage: `url(${FundoP})`,
              backgroundSize: "cover",
              height: "40%",
              width: "8%",
              marginTop: "6%"
            }}
            elevation={1}
          >
            <Grid item xs={1}>
              <Paper
                sx={{
                  position: "fixed",
                  backgroundImage: `url(${FundoP})`,
                  backgroundSize: "cover",
                  height: "40%",
                  width: "8%"
                }}
                elevation={1}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <Typography sx={{ color: "#FFF" }}>Menu</Typography>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => formRef.current?.submitForm()}
                    sx={{ marginTop: "10%", color: "#fff" }}
                    startIcon={<SaveIcon />}
                  >
                    Gerar
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginTop: "10%", color: "#fff" }}
                    startIcon={<InsertDriveFileOutlinedIcon />}
                  >
                    PDF
                  </Button>
                  <IconButton sx={{ marginTop: "80%", color: "#fff" }}>
                    <KeyboardBackspaceOutlinedIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
