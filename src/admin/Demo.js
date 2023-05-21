import React,{useEffect, useState} from 'react'
import './db.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios"

import { Link, useParams } from 'react-router-dom';

import StepIcon from '@mui/material/StepIcon';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import '../admin/db.css';


import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';


import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import AddProduct from '../product/AddProduct';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import EditProduct from '../product/EditProduct';

import DeleteIcon from '@mui/icons-material/Delete';

import Tooltip from '@mui/material/Tooltip';

export default function Demo() {
  const[users,setUsers]=useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const[product,setProduct]=useState({
    name:"",
    price: 0,
    quantity: 0,
    img : "",
    category: "",
    derectory: ""

  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openBR, setOpenBR] = React.useState(false);
  const handleCloseBR = () => {
    setOpenBR(false);
  };
  const handleOpenBR = () => {
    setOpenBR(true);
  };
  
  const loadUsers= async () =>{
    const result=await axios.get("http://localhost:8080/api/v1/auth/students1"
     );
   setUsers(result.data);
    

};
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows =users;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddProductClick = () => {
    setShowAddProduct(true);
  }

  const handleAddProductClose = () => {
    setShowAddProduct(false);
  }
  const handleAddProduct = () => {
    loadUsers()
  }

  
  const test =document.getElementsByClassName("btn1").length;
console.log(test)
  
 
  const {id}=useParams()
  useEffect(()=>{
     loadUsers();
  },[])
  
  const deleteProduct= async (id) =>{
    handleOpenBR()
    const result=await axios.delete(`http://localhost:8080/api/v1/auth/deleteProduct/${id}`);
  loadUsers()
  handleCloseBR();
    

};
const editProduct= async (id) =>{
  handleOpenBR()
  const result=await axios.get(`http://localhost:8080/api/v1/auth/getProduct/${id}`);
  setProduct(result.data)
  handleClickOpenED();
  handleCloseBR();

  

};
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const [openED, setOpenED] = React.useState(false);

const handleClickOpenED = () => {

  setOpenED(true);
};

const handleCloseED = () => {
  setOpenED(false);
};
  return (
    <div>
    <main>
    <Button onClick={handleOpenBR}>Show backdrop</Button>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBR}
      onClick={handleCloseBR}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <div class="head-title">
        <div class="left">
            <h1>Product</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <li>
                    <a class="active" href="#">Home</a>
                </li>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <i class='bx bxs-cloud-download' ></i>
            <span class="text">Download PDF</span>
        </a>
    </div>
    <button className='btn-download'  onClick={handleClickOpen}>
   Add Product
  </button>
 
  
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Product</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To add product to this website shop, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <AddProduct handleClose={handleClose} handleAddProduct={handleAddProduct}></AddProduct>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
  </Dialog>
  <Dialog open={openED} onClose={handleCloseED}>
    <DialogTitle>Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To Edit product to website shop, please enter your email address here. We
        will send updates occasionally.
      </DialogContentText>
      <EditProduct handleCloseED={handleCloseED} handleAddProduct={handleAddProduct} handOpenBR={handleOpenBR} handleCloseBR={handleCloseBR} product={product} id={product.id}></EditProduct>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseED}>Cancel</Button>
      <Button onClick={handleCloseED}>Subscribe</Button>
    </DialogActions>
  </Dialog>
   
    
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
    <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
           
          </TableRow>
        </TableHead>
      <TableBody>
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <TableRow key={row.id}>
            <TableCell style={{ width: 160 }}>
             <img className='img_ad' src= {"http://localhost:8080/images/img/"+row.img}></img>
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.name}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.price}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
            {row.category}
          </TableCell>
          <TableCell style={{ width: 160 }} align="right">
          {row.quantity}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
       
        <Tooltip title="Edit" onClick={()=>editProduct(row.id)}>
        <IconButton>
        <Link className=' ' to={`/getProduct/${row.id}`}> <i class="fa-solid fa-eye fa-bounce"></i></Link>
        </IconButton>
      </Tooltip>
       
        <Tooltip title="Edit" onClick={()=>editProduct(row.id)}>
        <IconButton>
        <h8 className="h8"><i class="fa-solid fa-gear fa-spin fa-spin-reverse"></i></h8>
        </IconButton>
      </Tooltip>
          <Tooltip title="Delete" onClick={()=>deleteProduct(row.id)}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
       
        
      </TableCell>
          </TableRow>
        ))}

        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={6}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  </TableContainer>
  </main>
    </div>
  )
}
