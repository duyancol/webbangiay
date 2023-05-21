import React,{useEffect, useState} from 'react'
import axios from "axios"
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function User() {
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [openBR, setOpenBR] = React.useState(false);
  const handleCloseBR = () => {
    setOpenBR(false);
  };
  const handleOpenBR = () => {
    setOpenBR(true);
  };
    const[users,setUsers]=useState([]);
    const loadUsers= async () =>{
        const result=await axios.get("http://localhost:8080/api/v1/auth/users/userAll");
       setUsers(result.data);
        
    
    };
    useEffect(()=>{
        loadUsers();
     },[])

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
      
      const rows = users;
      const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const [role, setRole] = useState(0);
  const handleStatusChangeWrapper = (email) => {
    return (event) => {
   setOpenBR(true)
       
      const selectedValue = event.target.value;
      const encodedValue = encodeStatus(selectedValue);

      setRole(encodedValue);
     
     
      axios
        .put(`http://localhost:8080/api/v1/auth/users/updateRole?email=${email}&role=${encodedValue}`)
        .then((response) => {
         
          
            

          loadUsers()
          setOpenBR(false)
          setOpen(true)
          
        })
        .catch((error) => {
          console.error("Lỗi khi gửi dữ liệu: ", error);
        });
    }
  };
  const encodeStatus = (role) => {
    switch (role) {
      case "user":
        return "USER";
      case "admin":
        return "ADMIN";
     
      default:
        return "-1"; // Giá trị mặc định nếu không phù hợp
    }
    
  };
  return (
    <div>
    <main>
    
   
    <div class="head-title">
   
        <div class="left">
            <h1>User</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <li>
                    <a class="active" href="#">User</a>
                </li>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <i class='bx bxs-cloud-download' ></i>
            <span class="text">Download PDF</span>
        </a>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
      <TableRow>
      
        <TableCell align="left">Email</TableCell>
        <TableCell align="center">First Name</TableCell>
        <TableCell align="center">Last Name</TableCell>
        <TableCell align="center">Role</TableCell>
        <TableCell align="center">Action</TableCell>
       
      </TableRow>
    </TableHead>
        <TableBody>
       
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBR}
          onClick={handleCloseBR}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            
            <TableRow key={row.id}>
           
              <TableCell tyle={{ width: 160 }} align="left">
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.firstname}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.lastname} 
                
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
              {row.roles.map(u => (
                <div>{u.authority}</div>
              ))}
              <label htmlFor="role">Role :</label>
              <select id="role" name="role" onChange={handleStatusChangeWrapper(row.email)} value={role} >
              
              <option value=""></option>
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
                
              </select>
              <div>
              
            </div>
              </TableCell>
              
              <TableCell style={{ width: 160 }} align="center">
              <Tooltip title="View"  >
              <IconButton>
              <i class="fa-solid fa-eye fa-bounce"></i>
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
              colSpan={7}
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
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert className="alert" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is update Role success !
        </Alert>
      </Snackbar>
     
    </Stack>
      </main>
    </div>
  )
}
