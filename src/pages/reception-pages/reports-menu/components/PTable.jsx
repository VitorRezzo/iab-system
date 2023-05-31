import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  TextField,
  InputAdornment,
  Avatar,
  Button,
  Divider
} from "@mui/material/";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ApiServer from "../../../../services/ApiServer.js";
import Cookies from "js-cookie";
import PRFilters from "./PRFilters.jsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useListPatients } from "../../../../shared/context/reception-sharedcomponents/list-context-report/PatientContext.jsx";
import { PPDFReports } from "./PPDFReports.jsx";

import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useDebounce from "../../../../shared/hooks/useDebounce.jsx";

Linhas.propTypes = {
  dados: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    Address: PropTypes.shape({
      county: PropTypes.string.isRequired,
      district: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      street: PropTypes.string.isRequired
    }),
    Status: PropTypes.shape({ status: PropTypes.string.isRequired }),
    MedicalRecord: PropTypes.shape({
      pathology: PropTypes.string.isRequired,
      clinicalstate: PropTypes.string.isRequired
    }),
    Avatar: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired
};

export function PTable() {
  const { patientsList, setPatientsList } = useListPatients();
  const [open, setOpen] = useState(false);
  const [dataP, setDataP] = useState({ name: "", cpf: "" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const debouncedValue = useDebounce(dataP, 500);

  const listAllPatients = async () => {
    console.log("listado....");
    await ApiServer.get("/listAll-patients", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        setPatientsList((prevent) => [...prevent, response.data[i]]);
      }
    });
  };

  useEffect(() => {
    listAllPatients();
    if (debouncedValue) {
      searchPatients();
    }
  }, [debouncedValue]);

  const searchPatients = async () => {
    if (dataP.name !== "" && dataP.cpf !== "") {
      await ApiServer.post(
        "/search-patient-bynameorcpf",
        {
          fullname: dataP.name,
          cpf: dataP.cpf
        },
        {
          headers: {
            "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
          }
        }
      ).then((response) => {
        setPatientsList(response.data);
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "2%",
          display: "flex",
          flexDirection: "row",
          height: "60px",
          width: "100%"
        }}
      >
        <TextField
          type="text"
          sx={{ marginRight: "40%", width: "400px" }}
          onChange={(event) => {
            setDataP({ name: event.target.value, cpf: event.target.value });
          }}
          size="small"
          name="pesquisa"
          label="Pesquisar"
          placeholder="digite o nome ou cpf"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonSearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button
          onClick={() => {
            listAllPatients();
          }}
          sx={{ height: "40px", marginRight: "2%" }}
          variant="contained"
        >
          Atualizar
        </Button>
        <Button
          onClick={handleOpen}
          startIcon={<FilterAltIcon />}
          sx={{ height: "40px", marginRight: "2%" }}
          variant="contained"
        >
          Filtros
        </Button>

        <PPDFReports />
        <PRFilters Open={open} Close={handleClose} />
      </Box>

      <TableContainer>
        <Table aria-label="collapsible table">
          <TableBody>
            {patientsList.length > 0 ? (
              patientsList.map((row) => <Linhas key={row.id} dados={row} />)
            ) : (
              <TableRow
                sx={{
                  marginTop: "2%",
                  backgroundColor: "#e6e8e3"
                }}
              >
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#171430"
                  }}
                >
                  Nenhum Resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Linhas(props) {
  const { dados } = props;
  const today = new Date();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [listMovements, setListMovements] = useState([]);
  const listMovesP = async () => {
    setOpen(!open);
    if (open === false) {
      await ApiServer.post(
        "/list-allmovementspatients",
        { idPatient: dados.id, date: moment(today).format("YYYY-MM-DD") },
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        setListMovements(response.data.map((value) => value));
        changeColorMov();
      });
    }
  };

  const changeColorMov = (procedure) => {
    switch (procedure) {
      case "Exame":
        return "#f3c75f";
      case "Quimioterapia":
        return "#fe6c2b";
      case "Transplante de medula óssea":
        return "#80b3ff";
      default:
        return "#F2F2";
    }
  };

  return (
    <React.Fragment>
      <TableRow
        aria-label="expand row"
        onClick={() => {
          listMovesP();
        }}
        sx={{
          marginTop: "2%",
          backgroundColor: "#e6e8e3"
        }}
      >
        <TableCell>
          <Avatar
            src={
              dados.Avatar?.url !== null ? "/files/" + dados.Avatar?.url : ""
            }
            sx={{ width: "60px", height: "60px" }}
          />
        </TableCell>
        <TableCell sx={{ color: "#171430" }} scope="dados">
          {dados.fullname}
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>{dados.cpf}</TableCell>
        <TableCell sx={{ color: "#171430" }}>
          {dados.MedicalRecord.pathology}
        </TableCell>
        <TableCell>
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "10%",
              color: "#353634",
              backgroundColor:
                dados.Status.status == "Internado" ||
                dados.Status.status == "Óbito"
                  ? "#fa3e3e"
                  : dados.Status.status == "Viagem"
                  ? "#f3c75f"
                  : dados.Status.status == "Curado"
                  ? "#80b3ff"
                  : "#a2fa1b",
              height: "30px",
              borderRadius: "5px"
            }}
          >
            {dados.Status.status}
          </Box>
        </TableCell>
        <TableCell>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                navigate(`/cadastro/paciente/${dados.id}`);
              }}
            >
              <NoteAltIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: "#f4f4f4" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Endereço
              </Typography>
              <Box>
                <Typography>Estado: {dados.Address.state}</Typography>

                <Typography>Municipio: {dados.Address.county}</Typography>

                <Typography>Bairro: {dados.Address.district}</Typography>

                <Typography>Rua: {dados.Address.street}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Resumo de Movimentação
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Origem</TableCell>
                    <TableCell>Destino</TableCell>
                    <TableCell>Meio de locomoção</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Procedimento</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Hora</TableCell>
                  </TableRow>
                </TableHead>

                <TableHead>
                  {listMovements.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{value.origin}</TableCell>
                      <TableCell>{value.destiny}</TableCell>
                      <TableCell>{value.transport}</TableCell>
                      <TableCell>{value.price}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: changeColorMov(value.procedure)
                        }}
                      >
                        {value.procedure}
                      </TableCell>
                      <TableCell>
                        {moment(value.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(value.hour).format("HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="dados"></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
