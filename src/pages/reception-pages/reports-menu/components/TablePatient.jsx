import React, { useState, useEffect } from "react";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { FilterTable } from "./FilterTable.jsx";
import { PDFReports } from "./PDFReports.jsx";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useDebounce from "../../../../shared/hooks/useDebounce.jsx";
import { setPatientTable } from "../../../../shared/redux/slices/ReportsMenuSlice.jsx";
import { useDispatch, useSelector } from "react-redux";

export function TablePatient() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.reportsMenu);

  useEffect(() => {
    listAllPatients();
  }, []);

  const listAllPatients = async () => {
    await ApiServer.get("/listAll-patients", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      dispatch(setPatientTable(response.data));
    });
  };

  const searchPatients = async (value) => {
    await ApiServer.post(
      "/search-patient-bynameorcpf",
      {
        fullname: value,
        cpf: value
      },
      {
        headers: {
          "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN)
        }
      }
    ).then((response) => {
      dispatch(setPatientTable(response.data.map));
    });
  };

  const debounceSearchdPatients = useDebounce(searchPatients, 500);

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
          onChange={(e) => debounceSearchdPatients(e.target.value)}
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
          component="button"
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
        <PDFReports type="patient" />
        <FilterTable open={isOpen} close={handleClose} type="patient" />
      </Box>

      <TableContainer>
        <Table aria-label="collapsible table">
          <TableBody>
            {Data.patientTable !== null ? (
              Data.patientTable.map((value, index) => (
                <Linhas key={index} data={value} />
              ))
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

function Linhas(patient) {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(null);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const navigate = useNavigate();
  const [listMovements, setListMovements] = useState([]);

  useEffect(() => {
    return () => {
      setIsOpen(null);
    };
  }, []);

  const listMovesP = async () => {
    await ApiServer.post(
      "/list-allmovementspatients",
      {
        idPatient: patient.data.id,
        date: moment(today).format("YYYY-MM-DD")
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setListMovements(response.data.map((value) => value));
      changeColorMov();
    });
    handleOpen();
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
          isOpen ? handleClose() : handleOpen();
        }}
        sx={{
          marginTop: "2%",
          cursor: "pointer",
          backgroundColor: "#e6e8e3"
        }}
      >
        <TableCell>
          <Avatar
            src={
              patient.data?.Resident.Avatare?.url !== null
                ? `${process.env.REACT_APP_BACKEND}/files/${patient.data?.Resident.Avatare.url}`
                : ""
            }
            sx={{
              "& .MuiAvatar-img": {
                padding: "15%",
                backgroundColor: "white"
              },
              width: "80px",
              height: "80px"
            }}
            alt="Avatar Pacientes"
          />
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>
          {patient.data.Resident.fullname}
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>
          {patient.data.Resident.cpf}
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>
          {patient.data.MedicalRecord.pathology}
        </TableCell>
        <TableCell>
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "10%",
              color: "#353634",
              backgroundColor:
                patient.data.Resident.Status.status == "Internado" ||
                patient.data.Resident.Status.status == "Óbito"
                  ? "#fa3e3e"
                  : patient.data.Resident.Status.status == "Viagem"
                  ? "#f3c75f"
                  : patient.data.Resident.Status.status == "Curado"
                  ? "#80b3ff"
                  : "#a2fa1b",
              height: "30px",
              borderRadius: "5px"
            }}
          >
            {patient.data.Resident.Status.status}
          </Box>
        </TableCell>
        <TableCell>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                navigate(`/cadastro/paciente/${patient.data.Resident.id}`);
              }}
            >
              <NoteAltIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: "#f4f4f4" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h2" gutterBottom component="div">
                Endereço:
              </Typography>
              <Box>
                <Typography variant="h4">
                  Estado: {patient.data.Resident.Address.state}
                </Typography>

                <Typography variant="h4">
                  Municipio: {patient.data.Resident.Address.county}
                </Typography>

                <Typography variant="h4">
                  Bairro: {patient.data.Resident.Address.district}
                </Typography>

                <Typography variant="h4">
                  Rua: {patient.data.Resident.Address.street}
                </Typography>
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
                  {/* {listMovements.map((moviment) => (
                    <TableRow key={moviment.id}>
                      <TableCell>{moviment.origin}</TableCell>
                      <TableCell>{moviment.destiny}</TableCell>
                      <TableCell>{moviment.transport}</TableCell>
                      <TableCell>{moviment.price}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: changeColorMov(moviment.procedure)
                        }}
                      >
                        {moviment.procedure}
                      </TableCell>
                      <TableCell>
                        {moment(moviment.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(moviment.hour).format("HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="patient.data"></TableCell>
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
