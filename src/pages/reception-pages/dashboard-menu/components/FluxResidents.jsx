import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";
import moment from "moment";
import "moment/locale/pt";
import { styled } from "@mui/system";

export const CellUI = styled(TableCell)({
  fontSize: "0.88rem"
});
export function FluxResidents() {
  const [fluxResidents, setFluxResidents] = useState();

  useEffect(async () => {
    await ApiServer.get("/list-residents-Activity", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setFluxResidents(response);
    });
  }, []);
  return (
    <TableContainer sx={{ minHeight: 280 }}>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            "& .MuiTableCell-head": {
              fontWeight: 700,
              fontSize: "1rem",
              color: "#085A8C"
            }
          }}
        >
          <TableRow>
            <TableCell>Morador</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Atividade</TableCell>
            <TableCell align="left">Data & Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fluxResidents?.data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 }
              }}
            >
              <CellUI component="th" scope="row">
                {row.name}
              </CellUI>
              <CellUI align="left">{row.status}</CellUI>
              <CellUI align="left">{row.activity}</CellUI>
              <CellUI align="left">
                {moment(row.updatedAt).locale("pt").format("LLL")}
              </CellUI>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
