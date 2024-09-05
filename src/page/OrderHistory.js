
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { jsx, css } from '@emotion/react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import Header from "../layout/Header";

import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import Footer from '../layout/Footer';
import axios from 'axios';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function OrderHistory({cartItemCount}) {

    const [order, setOrder] = useState([]);
   
    const [open, setOpen] = React.useState(false);
    const [openLoad, setOpenLoad] = React.useState(false);
    const handleCloseL = () => {
      setOpenLoad(false);
    };
    const handleOpenL = () => {
      setOpenLoad(true);
    };
  const handleClickOpen = () => {
    
    setOpen(true);
  };
  const huydonhang = (id,status) => {
    if (status!=="1") {
      alert("You cannot cancel your order because it is in transit !");
    } else {
      // Xử lý submit
     

      axios(`http://localhost:8080/api/v1/auth/updateStatusHuy?id=${id}
      `, {
        method: "PUT", 
        data: {
            id:id
        }
      })
        
      .then(response => {
       loadOder();
         
      })
      .catch(error => {
        
          console.log(error)
          
          
         
         
             
         
      })
    }
    
      
   }
  const handleClose = () => {
    setOpen(false);
  };
    const iduser=localStorage.getItem("id")
    useEffect(() => {loadOder()
      
    }, []);
    const loadOder = (d)=>{
      fetch(`http://localhost:8080/api/v1/auth/order/${iduser}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error(err));
    }
    const [orderDetail, setOrderDetail] = useState([]);
    const oderDetailID = (d)=>{
      handleOpenL();
      handleClickOpen();
      fetch(`http://localhost:8080/api/v1/auth/cart/${d}`)
        .then(res => res.json())
        .then(data => setOrderDetail(data))
        .catch(err => console.error(err));
       
       

        
  }
  
   
    
    if (!Array.isArray(order) || order.length === 0) {
      return <div>Không có đơn hàng</div>;
    }
    const fomatDate = (d)=>{
      const date=moment({d}).format('DD-MM-YYYY');
      return date;
  }

  const cssStatus = ()=>{
    const buttonStyles = css`
  #progressbar-2 li:nth-child(3):after {
	left: 1%;
	width: 100%;
	background: #c5cae9 !important;
	}
`;
    return buttonStyles;
}



  
  
    return (
      <div>
     
        {order.map((items, index) => (
          
          <div  class="container py-5 h-100">
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
                        <img src={"http://localhost:8080/images/img/"+product.img}
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
                  <p class="text-muted mb-0"><span class="fw-bold me-4">Total</span> ${orderDetail.price}</p>
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
      <DialogActions className='btn_rerun'>
      <button type="button" class="btn btn-warning" autoFocus onClick={handleClose}>
        Rerun
      </button>
    </DialogActions>
          
        </Dialog>
          
        
            <div class="row d-flex justify-content-center align-items-center h-100">
            
              <div class="col-12">
              
                <div class="card card-stepper text-black tsg" >
                
                  <div class="card-body p-5">
        
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <h3 class="mb-0">INVOICE <span class="text-primary font-weight-bold">#{items.id}</span></h3>
                        <button type="button" class="btn btn-success"  onClick={() => oderDetailID(items.id)} >
        View Detail Order
      </button>
      <button type="button" class="btn btn-danger btd"  onClick={() => huydonhang(items.id,items.status)} >
      Cancel Order
      </button>
                      </div>
                      <div class="text-end">
                      
                        <p class="mb-0">Expected Arrival <span > {fomatDate(items.creatAt)}  </span></p>
                        <p class="mb-0">Total <span class="font-weight-bold">{items.price} $</span></p>
                      </div>
                    </div>
                    <div className="progress">
                    
                  </div>
                  <ul id="progressbar-2" class="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                  <li class={`step0 ${items.status >= 1 ? 'active' : ''} text-center`} id="step1"></li>
                  <li class={`step0 ${items.status >= 2 ? 'active' : ''} text-center`} id="step2"></li>
                  <li class={`step0 ${items.status >= 3 ? 'active' : ''} text-center`} id="step3"></li>
                  <li class={`step0 ${items.status >= 4 ? 'active' : ''} text-center text-end`} id="step4"></li>
                </ul>
                
        
                    <div class="d-flex justify-content-between">
                      <div class="d-lg-flex align-items-center">
                        <i class="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                        <div>
                        <Link  to={`/products/${items.id}`}><p class="fw-bold mb-1">Order</p>
                        <p class="fw-bold mb-0">Processed</p></Link>
                          
                        </div>
                      </div>
                      <div class="d-lg-flex align-items-center">
                        <i class="fas fa-box-open fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                        <div>
                          <p class="fw-bold mb-1">Order</p>
                          <p class="fw-bold mb-0">Shipped</p>
                        </div>
                      </div>
                      <div class="d-lg-flex align-items-center">
                        <i class="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                        <div>
                          <p class="fw-bold mb-1">Order</p>
                          <p class="fw-bold mb-0">En Route</p>
                        </div>
                      </div>
                      <div class="d-lg-flex align-items-center">
                        <i class="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                        <div>
                          <p class="fw-bold mb-1">Order</p>
                          <p class="fw-bold mb-0">Arrived</p>
                        </div>
                      </div>
                    </div>
        
                  </div>
        
                </div>
              </div>
            </div>
          </div>
        
        ))}
       
      </div>
    );
  }