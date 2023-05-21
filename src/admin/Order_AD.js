import React,{useEffect, useState} from 'react'
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
import axios from "axios"
import TableHead from '@mui/material/TableHead';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const steps = ['Cho tiep nhan','Tiep nhan', 'Dang Van chuyen', 'Da giao'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Order_AD() {
    const[order,setOrder]=useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [selectedDate, setSelectedDate] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openLoad, setOpenLoad] = React.useState(false);
    const [status, setStatus] = useState(0);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openBR, setOpenBR] = React.useState(false);
    const handleCloseBR = () => {
      setOpenBR(false);
    };
    const handleOpenBR = () => {
      setOpenBR(true);
    };
    const handleClick = () => {
      setOpenAlert(true);
    };
  
    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };
    
    const handleStatusChangeWrapper = (id) => {
      return (event) => {
        setOpenBR(true);
        const selectedValue = event.target.value;
        const encodedValue = encodeStatus(selectedValue);
  
        setStatus(encodedValue);

  
        axios
          .put(`http://localhost:8080/api/v1/auth/updateStatus?status=${encodedValue}&id=${id}`, { id: id, status: encodedValue })
          .then((response) => {
            setOpenBR(false)
            setOpenAlert(true);
            handleCloseStatus();
            console.log("Đã gửi dữ liệu thành công.");
          })
          .catch((error) => {
            console.error("Lỗi khi gửi dữ liệu: ", error);
          });
      };
    };
  
    const encodeStatus = (status) => {
      switch (status) {
        case "wait-accept":
          return "1";
          case "accept":
          return "2";
        case "shipping":
          return "3";
        case "delivered":
          return "4";
          case "error":
          return "0";
        default:
          return "-1"; // Giá trị mặc định nếu không phù hợp
      }
    };
    const handleCloseL = () => {
      setOpenLoad(false);
    };
    const handleOpenL = () => {
      setOpenLoad(true);
    };
    const isStepOptional = (step) => {
      return step === 1;
    };
    const handleClickOpen = () => {
    
      setOpen(true);
    };
  
    const handleClose = () => {
      loadUsers();
      setOpen(false);
     
    };
    const [orderDetail, setOrderDetail] = useState([]);
    const oderDetailID = (d)=>{
      handleOpenL();
      handleClickOpen();
      fetch(`http://localhost:8080/api/v1/auth/cart/${d}`)
        .then(res => res.json())
        .then(data => setOrderDetail(data))
        .catch(err => console.error(err));    
  }
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
    const fomatDate = (d)=>{
      const date=moment({d}).format('DD-MM-YYYY');
      return date;
  }
    const handleNext = () => {
       // Lấy order hiện tại tương ứng với activeStep
    const currentOrder = order[activeStep];
    // Cập nhật trạng thái đơn hàng hiện tại
    currentOrder.status = 0;
    // Cập nhật order đã được cập nhật
    const updatedOrders = [...order];
    updatedOrders[activeStep] = currentOrder;
    // Cập nhật danh sách đơn hàng
    setOrder(updatedOrders);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    const loadUsers= async () =>{
        const result=await axios.get("http://localhost:8080/api/v1/auth/viewAllOrder");
       setOrder(result.data);
        
    
    };
    useEffect(()=>{
        loadUsers();
     },[])
     const handleDateChange = async (date) => {
      const formattedDate = date.toISOString().substring(0, 10); // 'YYYY-MM-DD'
      setSelectedDate(formattedDate);
  
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/viewOrderAdmin?date=${formattedDate}`);
       
        const data = response.data;
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
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
      
      const rows =order
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
      const renderOrderList = () => {
        return (
          <div>
            
          </div>
        );
      };
      const [openStatus, setOpenStatus] = React.useState(false);
     
    
     
    
      const handleClickOpenStatus = () => {
        setOpenStatus(true);
      };
    
      const handleCloseStatus = (event, reason) => {
        if (reason !== 'backdropClick') {
          setOpenStatus(false);
        }
      };
  return (
    <div>
    <main>
    
   
    <div class="head-title">
        <div class="left">
            <h1>Order</h1>
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
    <form>
    <label htmlFor="date-selector">Select date:</label>
    <input
      type="date"
      id="date-selector"
      value={selectedDate}
      onChange={(event) => handleDateChange(new Date(event.target.value))}
    />
  </form>
  <h2>Order List:</h2>
  {renderOrderList()}
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
      <TableRow>
        
        <TableCell align="right">UserID</TableCell>
        <TableCell align="right">Created At</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="right">Phone</TableCell>
        <TableCell align="center">Status</TableCell>
        <TableCell align="center">Action</TableCell>
       
      </TableRow>
    </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
            
              <TableCell style={{ width: 160 }} component="th" scope="row">
                {row.userID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.createdAt}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.address}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.price}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              {row.phone}
            </TableCell>
            <TableCell  align="center">
            <Box sx={{ width: '100%' }}>
            <Stepper activeStep={row.status}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
               
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                
                </Box>
              </React.Fragment>
            )}
          </Box>
          </TableCell>
          <TableCell style={{ width: 160 }} align="center">
          <Tooltip title="View"  onClick={() => oderDetailID(row.id)}>
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
    </main>

    <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
  <DialogContent>
  <div class="container py-5 h-100">
  
  <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-lg-10 col-xl-8">
      <div class="card co" >
        <div class="card-header px-4 py-5">
          <h5 class="text-muted mb-0">Thanks for your Order, <span >{localStorage.getItem("nameuser")}</span>!</h5>
        </div>
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="lead fw-normal mb-0" >Receipt</p>
            <p class="small text-muted mb-0">Receipt Voucher : H1KAU9-H84UIL</p>
          </div>

          {orderDetail?.listProduct?.map((product, index) => (
            
            <div class="card shadow-0 border mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img src= {"http://localhost:8080/images/img/"+product.img}
                    class="img-fluid" alt=""/>
                </div>
                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0">{product.name}</p>
                </div>
                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 small">White</p>
                </div>
                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 small">Capacity: </p>
                </div>
                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 small">Qty: {product.quantity}</p>
                </div>
                <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 small">${product.price}</p>
                </div>
              </div>
              <hr class="mb-4 mbo"/>
              <div class="row d-flex align-items-center">
                <div class="col-md-2">
                  <p class="text-muted mb-0 small">Track Order</p>
                </div>
                <div class="col-md-10">
                  <div class="progress" >
                    <div class="progress-bar" role="progressbar"
                      aria-valuenow="65"
                      aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <div class="d-flex justify-content-around mb-1">
                    <p class="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                    <p class="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            ))}

          
          


          <div class="d-flex justify-content-between pt-2">
            <p class="fw-bold mb-0">Order Details</p>
            <p class="text-muted mb-0"><span class="fw-bold me-4">Total</span> ${orderDetail.price} </p>
          </div>

          <div class="d-flex justify-content-between pt-2">
            <p class="text-muted mb-0">Invoice Number : 788152</p>
            <p class="text-muted mb-0"><span class="fw-bold me-4">Discount</span> $0</p>
          </div>

          <div class="d-flex justify-content-between">
            <p class="text-muted mb-0">Invoice Date : {fomatDate(orderDetail.creatAt)}</p>
            <p class="text-muted mb-0"><span class="fw-bold me-4">GST 18%</span>$ 0 </p>
          </div>

          <div class="d-flex justify-content-between mb-5">
            <p class="text-muted mb-0">Recepits Voucher : H18KU-H62IIK</p>
            <p class="text-muted mb-0"><span class="fw-bold me-4">Delivery Charges</span> Free</p>
          </div>
          <div class="d-flex justify-content-between pt-2">
          <p class="fw-bold mb-0"></p>Status :
          <span class="fw-bold "> {orderDetail.status == 1 ? ( <div value="wait-accept">Chờ tiếp nhận</div> ): 
          ""
        }
        {orderDetail.status == 2 ? (  <div value="accept">Tiếp nhận</div> ): 
        ""
      }
        {orderDetail.status == 3 ? (  <div value="shipping">Đang vận chuyển</div> ): 
        ""
      }
      {orderDetail.status == 4 ? (  <div value="delivered">Đã giao</div> ): 
        ""
      }
      {orderDetail.status == -1 ? (  <div value="error">Đã Huy</div> ): 
        ""
      }</span>  
        </div>
        </div>
        <div class="card-footer border-0 px-4 py-5"
         >
          <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
            paid: <span class="h2 mb-0 ms-2">${orderDetail.price}</span></h5>
        </div>
      </div>
    </div>
  </div>
</div>
</DialogContent>
<Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert className="alert" onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          This is Update Status success !
        </Alert>
      </Snackbar>
      
    </Stack>
<DialogActions className='btn_rerun'>
<button type="button" class="btn btn-warning" autoFocus onClick={handleClose}>
  Rerun
</button>

<button className='btn btupdate'  onClick={handleClickOpenStatus}>Update Status</button>
      <Dialog disableEscapeKeyDown open={openStatus} onClose={handleCloseStatus}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
       
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBR}
          onClick={handleCloseBR}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            
          <div>
          <label htmlFor="status">Status :</label>
          <select id="status" name="status" onChange={handleStatusChangeWrapper(orderDetail.id)} value={status} >
          {orderDetail.status == 1 ? ( <option value="wait-accept">Chờ tiếp nhận</option> ): 
          ""
        }
        {orderDetail.status == 2 ? (  <option value="accept">Tiếp nhận</option> ): 
        ""
      }
        {orderDetail.status == 3 ? (  <option value="shipping">Đang vận chuyển</option> ): 
        ""
      }
      {orderDetail.status == 4 ? (  <option value="delivered">Đã giao</option> ): 
        ""
      }
      {orderDetail.status == -1 ? (  <option value="error">Đã Huy</option> ): 
        ""
      }
        
            <option value="wait-accept">Chờ tiếp nhận</option>
            <option value="accept">Tiếp nhận</option>
            <option value="shipping">Đang vận chuyển</option>
            <option value="delivered">Đã giao</option>
            <option value="error">Đã Huy</option>
          </select>
        </div>
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatus}>Cancel</Button>
        
        </DialogActions>
      </Dialog>
</DialogActions>
    
  </Dialog>
    </div>
  )
}
