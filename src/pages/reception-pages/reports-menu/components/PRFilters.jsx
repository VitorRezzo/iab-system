import React from "react";
import ApiServer from "../../../../services/ApiServer.js";
import Cookies from "js-cookie";
import { useListPatients } from "../../../../shared/context/reception-sharedcomponents/list-context-report/PatientContext.jsx";
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

export default function PRFilters(props) {
  const { setListPatients } = useListPatients();

  const Listfilters = async (e) => {
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
      setListPatients([]);
      for (let i = 0; i < response.data.length; i++) {
        setListPatients((prevent) => [...prevent, response.data[i]]);
      }
    });
  };

  return (
    <React.Fragment>
      <Dialog open={props.Open} onClose={props.Close}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            onSubmit={Listfilters}
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