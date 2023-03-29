import React,{useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios"
import { Link, useParams } from 'react-router-dom';
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  action: number,
) {
  return { name, calories, fat ,action};
}


export default function DenseTable() {
  
const test =document.getElementsByClassName("btn1").length;
console.log(test)
  const[users,setUsers]=useState([]);
 
  const {id}=useParams()
  useEffect(()=>{
     loadUsers();
  },[])
  const loadUsers= async () =>{
      const result=await axios.get("http://localhost:8080/api/v1/auth/students1");
     setUsers(result.data);
      

  };
  const deleteProduct= async (id) =>{
    const result=await axios.delete(`http://localhost:8080/api/v1/auth/deleteProduct/${id}`);
  loadUsers()
    

};

  return (
    <TableContainer component={Paper}>
    {test}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="center">Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.img}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">
              <Link className='btn btn-primary' to={`/getProduct/${row.id}`}>seen</Link>
              <Link className='btn btn-primary' to={`/editProduct/${row.id}`}>edit</Link>
              <button className='btn btn-primary btn1' onClick={()=>deleteProduct(row.id)}>delete</button>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}