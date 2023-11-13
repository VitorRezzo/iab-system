import { useState, useEffect } from "react";
import { Table, Avatar, Typography } from "@mui/material";
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

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const CellUI = styled(TableCell)({
  fontSize: "0.88rem",
  border: 0
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
              backgroundColor: "#85d4ff",
              color: "#085A8C"
            }
          }}
        >
          <TableRow>
            <TableCell sx={{ width: "10px" }}></TableCell>
            <TableCell></TableCell>
            <TableCell>Morador</TableCell>
            <TableCell align="left" sx={{ width: "10px" }}>
              Status
            </TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left" sx={{ width: "10px" }}>
              Atividade
            </TableCell>
            <TableCell align="center">Data & Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fluxResidents?.data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#ebffff"
                },

                "&:last-child td, &:last-child th": { border: 0 }
              }}
            >
              <CellUI>
                <Avatar
                  src={
                    row?.Resident?.Avatare?.url !== undefined
                      ? `${process.env.REACT_APP_BACKEND}/files/${row?.Resident?.Avatare?.url}`
                      : ""
                  }
                  sx={{
                    "& .MuiAvatar-img": {
                      padding: "25%"
                    },
                    width: "50px",
                    height: "50px"
                  }}
                />
              </CellUI>
              <CellUI>
                <Typography
                  sx={{
                    backgroundColor:
                      row.Resident.Patients.length > 0 ? "#169d99" : "#070743",
                    color: "white",
                    padding: "2%",
                    borderRadius: "5px"
                  }}
                  component="span"
                >
                  {row.Resident.Patients.length > 0 ? "PAC" : "ACO"}
                </Typography>
              </CellUI>
              <CellUI>{row.Resident.fullname}</CellUI>
              <CellUI>
                <Typography component="span"> {row.status}</Typography>
              </CellUI>
              <CellUI>
                {row.status === "Na Casa" ? (
                  <ArrowUpwardIcon
                    sx={{
                      color: "#1aca6f"
                    }}
                  />
                ) : (
                  <ArrowDownwardIcon sx={{ color: "#a82743" }} />
                )}
              </CellUI>
              <CellUI align="left">{row.activity}</CellUI>

              <CellUI align="center">
                <Typography component="span">
                  {moment(row.updatedAt).locale("pt").format("LLL")}
                </Typography>
              </CellUI>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
