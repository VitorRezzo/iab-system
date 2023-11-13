import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Avatar
} from "@mui/material";

import ApiServer from "../../../../services/ApiServer";
import Cookies from "js-cookie";

export function MovementsTable() {
  const [listResidents, setListResidents] = useState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    listAllResidents();
  }, []);

  const listAllResidents = async () => {
    await ApiServer.get("/listallresidentsbystatus", {
      headers: { "x-acess-token": Cookies.get(process.env.REACT_APP_TOKEN) }
    }).then((response) => {
      setListResidents(response.data);
    });
  };

  return (
    <Paper sx={{ width: "100%", minHeight: "200px" }}>
      <TableContainer sx={{ maxHeight: 280 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              backgroundColor: "#69d2e7"
            }}
          >
            <TableRow>
              <TableCell align="center">*</TableCell>

              <TableCell>Nome</TableCell>

              <TableCell>Procedimento</TableCell>

              <TableCell>Descrição</TableCell>

              <TableCell>Transporte</TableCell>

              <TableCell>Data</TableCell>

              <TableCell>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                listResidents?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : // eslint-disable-next-line no-unsafe-optional-chaining
                listResidents
            )?.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>
                  <Avatar src="" sx={{ width: "30px", height: "30px" }} />
                </TableCell>

                <TableCell key={row.id}>{row.fullname}</TableCell>
                <TableCell>{row.cpf}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow hover role="checkbox" key={1}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={listResidents?.data?.length | 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
