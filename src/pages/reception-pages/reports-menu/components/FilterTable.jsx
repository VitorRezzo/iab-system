import React from "react";
import ApiServer from "../../../../services/ApiServer.js";
import Cookies from "js-cookie";
import ListPatologia from "../../../../constants/ListPatologia.json";
import ListEscolaridade from "../../../../constants/ListEscolaridade.json";
import ListGenero from "../../../../constants/ListGenero.json";
import { ListMuni } from "../../../../constants/ListMuni.js";
import {
  Dialog,
  DialogTitle,
  Grid,
  Autocomplete,
  DialogContent,
  Button,
  TextField,
  Box
} from "@mui/material";
import { useDispatch } from "react-redux";

import { setPatientTable } from "../../../../shared/redux/slices/camera-file-slice/ReportsMenuSlice.jsx";
import { setCompanionTable } from "../../../../shared/redux/slices/camera-file-slice/ReportsMenuSlice.jsx";
export function FilterTable(props) {
  const dispatch = useDispatch();

  const ListFilteredPatients = async (e) => {
    e.preventDefault();
    await ApiServer.post(
      "/filter-patients",
      {
        religion: "",
        county: e.target.municipio.value,
        schooling: e.target.grauinstru.value,
        profession: "",
        state: "",
        directedhospital: "",
        pathology: e.target.patologia.value,
        gender: e.target.genero.value
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      dispatch(setPatientTable(response));
    });
  };

  const ListFilteredCompanions = async (e) => {
    e.preventDefault();
    await ApiServer.post(
      "/filter-companions",
      {
        religion: "",
        county: e.target.municipio.value,
        schooling: e.target.grauinstru.value,
        profession: "",
        state: "",
        gender: e.target.genero.value
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      dispatch(setCompanionTable(response));
    });
  };

  return (
    <React.Fragment>
      <Dialog open={props?.open} onClose={props.close}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            onSubmit={(data) => {
              props.type == "patient"
                ? ListFilteredPatients(data)
                : ListFilteredCompanions(data);
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "500px",
              width: "500px"
            }}
          >
            <Grid container sx={{ padding: "10%" }} spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={ListMuni}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Municipios"
                      name="municipio"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={ListEscolaridade}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Grau de Instrução"
                      name="grauinstru"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={ListPatologia}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Patologia"
                      name="patologia"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={ListGenero}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Genêro"
                      name="genero"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button type="submit">Salvar</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
