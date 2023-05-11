import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
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
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useListCompanions } from "../../../../shared/context/reception-sharedcomponents/list-context-report/CompanionContext.jsx";
import { useEffect } from "react";
import { EPDFReports } from "./EPDFReports.jsx";
import { ERFilters } from "./ERFilters.jsx";
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
    Avatar: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired
};

export function ETable() {
  const { companionsList, setCompanionsList, listAllCompanions } =
    useListCompanions();
  const [open, setOpen] = useState(false);
  const [dataE, setDataE] = useState({ name: "", cpf: "" });
  const debouncedValue = useDebounce(dataE, 500);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    listAllCompanions();
  }, []);
  useEffect(() => {
    if (debouncedValue) {
      searchCompanions();
    }
  }, [debouncedValue]);

  const searchCompanions = async () => {
    if (dataE.name !== "" && dataE.cpf !== "") {
      await ApiServer.post(
        "/search-companion-bynameorcpf",

        {
          fullname: dataE.name,
          cpf: dataE.cpf
        },
        {
          headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
        }
      ).then((response) => {
        setCompanionsList(response.data);
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
            setDataE({ name: event.target.value, cpf: event.target.value });
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
            listAllDataCompanions();
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
        <ERFilters Open={open} Close={handleClose} />
        <EPDFReports />
      </Box>

      <TableContainer>
        <Table aria-label="collapsible table">
          <TableBody>
            {companionsList.length > 0 ? (
              companionsList.map((row) => <Linhas key={row.id} dados={row} />)
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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow
        aria-label="expand row"
        sx={{
          marginTop: "2%",
          backgroundColor: "#e6e8e3"
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <TableCell>
          <Avatar
            src={
              dados.Avatar?.url !== null ? "/files/" + dados.Avatar?.url : ""
            }
            sx={{ width: "60px", height: "60px" }}
            alt="Avatar Acompanhantes"
          />
        </TableCell>
        <TableCell sx={{ color: "#171430" }} scope="dados">
          {dados.fullname}
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>{dados.cpf}</TableCell>

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
                navigate(`/cadastro/Acompanhante/${dados.id}`);
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
            <Box sx={{ margin: 1 }}></Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
