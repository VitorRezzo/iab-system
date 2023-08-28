import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Avatar,
  IconButton,
  Tooltip,
  Grid
} from "@mui/material/";

import PageviewIcon from "@mui/icons-material/Pageview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import { VDatePick } from "../../../../shared/components/form-unform/VDatePick.tsx";
import { useNavigate } from "react-router-dom";

import { Form } from "@unform/web";

import Cookies from "js-cookie";
import ApiServer from "../../../../services/ApiServer.js";
import moment from "moment";

export function MoveTable() {
  const [data, setData] = useState([]);
  const today = new Date();

  useEffect(async () => {
    await ApiServer.post(
      "/list-allmovements",
      {
        date: moment(today).format("YYYY-MM-DD")
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setData(response.data.map((value) => value));
    });
  }, []);

  const handleSearch = async (data) => {
    await ApiServer.post(
      "/list-movements-betewendate",
      {
        startdate: data.startdate,
        enddate: data.enddate
      },
      {
        headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
      }
    ).then((response) => {
      setData(response.data.map((value) => value));
    });
  };

  return (
    <Box>
      <Box>
        <Form onSubmit={(data) => handleSearch(data)}>
          <Grid container spacing={1}>
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
            <Grid item xs={2}>
              <IconButton type="submit">
                <PageviewIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          background: "#f0f0f0",
          marginTop: "1%",
          height: "235px",
          overflowY: "auto"
        }}
      >
        <Table size="small">
          <TableHead
            sx={{
              backgroundColor: "#69d2e7"
            }}
          >
            <TableRow>
              <TableCell>Nome</TableCell>

              <TableCell>Procedimento</TableCell>

              <TableCell> Origem</TableCell>

              <TableCell> Destino</TableCell>

              <TableCell> Locomoção</TableCell>

              <TableCell> Valor</TableCell>

              <TableCell> Data</TableCell>

              <TableCell> Hora</TableCell>

              <TableCell align="center"> *</TableCell>
            </TableRow>
          </TableHead>

          {data.length > 0 ? (
            data.map((value, index) => <Lista key={index} dados={value} />)
          ) : (
            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center">Nenhuma Movimentação</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}

const Lista = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const deleteMove = async (id) => {
    await ApiServer.delete("/delete-moviment/" + id).then((response) => {
      console.log(response.message);
      navigate(0);
    });
  };
  return (
    <TableBody
      onClick={() => {
        setOpen(!open);
      }}
      aria-label="expand row"
    >
      <TableRow>
        <TableCell component="th" scope="row">
          <Avatar
            src={
              props.dados.Patient.Avatar?.url
                ? `${process.env.REACT_APP_BACKEND}/files/${props.dados.Patient.Avatar?.url}`
                : ""
            }
            sx={{
              width: "30px",
              height: "30px",
              float: "left",
              marginTop: "-3%",
              marginRight: "6px"
            }}
          />
          {props.dados.Patient.fullname}
        </TableCell>

        <TableCell>{props.dados.procedure}</TableCell>
        <TableCell>{props.dados.origin}</TableCell>
        <TableCell>{props.dados.destiny}</TableCell>
        <TableCell>{props.dados.transport}</TableCell>
        <TableCell>{props.dados.price}</TableCell>
        <TableCell>{moment(props.dados.date).format("DD/MM/YY")}</TableCell>
        <TableCell align="center">
          {moment(props.dados.hour).format("HH:mm")}
        </TableCell>
        <TableCell sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                navigate(`/cadastro/movimentacao/${props.dados.id}`);
              }}
            >
              <NoteAltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Excluir">
            <IconButton
              onClick={() => {
                deleteMove(props.dados.id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <TableRow sx={{ background: "#FFF" }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, background: "#FFF" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {props.dados.Companions?.map((value, index) => (
                <Box key={index}>
                  <Avatar
                    src={
                      value.Avatar?.url
                        ? `${process.env.REACT_APP_BACKEND}/files/${value.Avatar?.url}`
                        : ""
                    }
                    sx={{
                      width: "25px",
                      height: "25px",
                      float: "left",
                      marginRight: "5px"
                    }}
                  />
                  {value.fullname}
                </Box>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
