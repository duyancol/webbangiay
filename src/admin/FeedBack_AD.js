import React from 'react'
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
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function FeedBack_AD() {
    const[chat,setChat]=React.useState([]);
    const loadChat= async () =>{
        const result=await axios.get("http://localhost:8080/api/v1/auth/listFeedBack");
       setChat(result.data);
        
    
    };
    const onSupmit= async(e)=>{
       
             const formData = new FormData();
             formData.append('email',localStorage.getItem("email_m"));
             formData.append('content', feed.content);
             formData.append('id', localStorage.getItem("id_m"));
             const config = {
               headers: {
                 'content-type': `multipart/form-data; boundary=${formData._boundary}`,
               }
             }
             e.preventDefault();
             await axios.put("http://localhost:8080/api/v1/auth/putFeedBack",formData,config)
          loadChat()
          setOpen(false)
     
          
            
             
            
           }
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id,email) => {
    localStorage.setItem("id_m",id);
    localStorage.setItem("email_m",email);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    React.useEffect(()=>{
        loadChat();
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
      
      const rows = chat
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
  const[feed,setFeed]=React.useState({
    content : ""
  });
  const{content}=feed
const onInputChange=(e)=>{
setFeed({...feed,[e.target.name]:e.target.value});

}
  return (
    <div>
    <main>
    
   
    <div class="head-title">
        <div class="left">
            <h1>FeedBack</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <li>
                    <a class="active" href="#">FeedBack</a>
                </li>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <i class='bx bxs-cloud-download' ></i>
            <span class="text">Download PDF</span>
        </a>
    </div>
  <Dialog open={open} onClose={handleClose}>
   
    <DialogContent>
     
      <form class="contact100-form validate-form" onSubmit={(e)=>onSupmit(e)}>
    <span class="contact100-form-title">
    Get in touch
    </span>
    <div class="wrap-input100 validate-input" data-validate="Name is required">
   
    <span class="focus-input100"></span>
    
    </div>
    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
   
    <span class="focus-input100"></span>
  
    </div>
    <div class="wrap-input100 validate-input" data-validate="Message is required">
    <textarea class="input100" name="content" placeholder="Content" value={content} onChange={(e)=>onInputChange(e)}></textarea>
    <span class="focus-input100"></span>
    </div>
    <div class="container-contact100-form-btn">
    <button type='submit' class="contact100-form-btn">
    Send
    </button>
    </div>
    </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
  </Dialog>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableBody>
        {(rowsPerPage > 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.email}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.content}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {row.status}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              <button onClick={()=>handleClickOpen(row.id,row.email)} >Response</button>
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
            colSpan={3}
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
