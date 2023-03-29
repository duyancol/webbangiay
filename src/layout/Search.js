import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export default function AutoCompleter() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const baseURL = "http://localhost:8080/api/v1/auth/students1";
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setRows(response.data);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
        console.log(response.data);
      });
    }
  }, [rowdata]);


  return (
    <>
      {rows ? (
        <Card sx={{ minWidth: 900, m: 8 }} elevation={11}>
         
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              sx={{ width: 700 }}
              getOptionLabel={(rows) => rows.name || ""}
              renderInput={(params) => (
                <TextField {...params} label="Search Movie" size="small" />
              )}
            />
          
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
           
            
                
                <div>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                       <div>
                       <span >{row.id}</span>
                       <span >{row.name}</span>
                       <span>{row.img}</span>
                       </div>
                         
                       
                      );
                    })}
                </div>
             
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}

