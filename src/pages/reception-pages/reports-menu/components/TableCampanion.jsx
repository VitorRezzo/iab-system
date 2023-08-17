import React, { useState } from "react";
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
import { FilterTable } from "./FilterTable.jsx";
import { PDFReports } from "./PDFReports.jsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCompanionTable } from "../../../../shared/redux/slices/camera-file-slice/ReportsMenuSlice.jsx";
import useDebounce from "../../../../shared/hooks/useDebounce.jsx";
import { useDispatch, useSelector } from "react-redux";
export function TableCampanion() {
  const Data = useSelector((state) => state.reportsMenu);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const listAllCompanions = async () => {
    await ApiServer.get("/list-Allcompanions", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      dispatch(setCompanionTable(response.data));
    });
  };

  useEffect(() => {
    listAllCompanions();
  }, []);

  const searchCompanions = async (value) => {
    await ApiServer.post(
      "/search-companion-bynameorcpf",

      {
        fullname: value,
        cpf: value
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      dispatch(setCompanionTable(response.data));
    });
  };
  const debounceSearchCompanions = useDebounce(searchCompanions, 500);
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
          onChange={(e) => debounceSearchCompanions(e.target.value)}
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
            listAllCompanions();
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
        <PDFReports type="companion" />
        <FilterTable open={isOpen} close={handleClose} type="companion" />
      </Box>

      <TableContainer>
        <Table aria-label="collapsible table">
          <TableBody>
            {Data.companionTable !== null ? (
              Data.companionTable.map((value, index) => (
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

function Linhas(companion) {
  const [isOpen, setIsOpen] = useState(null);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setIsOpen(null);
    };
  }, []);
  return (
    <React.Fragment>
      <TableRow
        aria-label="expand row"
        sx={{
          marginTop: "2%",
          backgroundColor: "#e6e8e3"
        }}
        onClick={() => {
          isOpen ? handleClose() : handleOpen();
        }}
      >
        <TableCell>
          <Avatar
            src={
              companion.data.Avatar?.url !== null
                ? `${process.env.REACT_APP_BACKEND}/files/${companion.data.Avatar?.url}`
                : ""
            }
            sx={{ width: "60px", height: "60px" }}
            alt="Avatar Acompanhantes"
          />
        </TableCell>
        <TableCell sx={{ color: "#171430" }} scope="companion.data">
          {companion.data.fullname}
        </TableCell>
        <TableCell sx={{ color: "#171430" }}>{companion.data.cpf}</TableCell>

        <TableCell>
          <Box
            sx={{
              textAlign: "center",
              paddingTop: "10%",
              color: "#353634",
              backgroundColor:
                companion.data.Status.status == "Internado" ||
                companion.data.Status.status == "Óbito"
                  ? "#fa3e3e"
                  : companion.data.Status.status == "Viagem"
                  ? "#f3c75f"
                  : companion.data.Status.status == "Curado"
                  ? "#80b3ff"
                  : "#a2fa1b",
              height: "30px",
              borderRadius: "5px"
            }}
          >
            {companion.data.Status.status}
          </Box>
        </TableCell>
        <TableCell>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                navigate(`/cadastro/Acompanhante/${companion.data.id}`);
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
              <Typography variant="h5" gutterBottom component="div">
                Endereço
              </Typography>
              <Box>
                <Typography>Estado: {companion.data.Address.state}</Typography>

                <Typography>
                  Municipio: {companion.data.Address.county}
                </Typography>

                <Typography>
                  Bairro: {companion.data.Address.district}
                </Typography>

                <Typography>Rua: {companion.data.Address.street}</Typography>
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
