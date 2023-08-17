import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function FluxPatients() {
  const listPat = [
    {
      name: "Ana Paula",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Renato Lima",
      status: "Na Casa",
      type: "Retorno",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Lili kera",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Pablo tura",
      status: "Exame",
      type: "Quimio",
      color: "#fecd23",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Jura lima",
      status: "Internado",
      type: "Internação",
      color: "#bd3737",
      data: "25/06/2023 as 08:00"
    },
    {
      name: "Pablo tura",
      status: "Na Casa",
      type: "Novo Cadastro",
      color: "#0a996f",
      data: "25/06/2023 as 08:00"
    }
  ];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Atividade</TableCell>
            <TableCell align="left">Data & Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listPat.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
