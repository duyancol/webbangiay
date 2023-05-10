import React,{useState} from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Home from "./Home";
import Header from "../layout/Header";

import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import Login from './Login';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register({cartItemCount}) {
    const [open, setOpen] = React.useState(false);
    const [openSucess, setOpenSucess] = React.useState(false);
    const handleClick = () => {
      setOpen(true);
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    const handleOpen = () => {
      setOpenSucess(true);
    };
    const handleCloseS = () => {
      setOpenSucess(false);
    };
      const[user,setUser]=useState({
          firstname: "",
          lastname:"",
          email:"",
          password : "",
          isLogin : false
        });
      //   const{email,password,isLogin}=user
          const  logout =()=>{
          localStorage.removeItem("token");
          localStorage.removeItem("nameuser");
          localStorage.removeItem("id");
          this.onLogout();
      }
      const onLogout = ()=>{
          setUser({isLogin : false})
      }
  
      
      const{firstname,lastname,email,password,isLogin}=user
    const onInputChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value});
    }
    
      const register = () => {
        handleOpen()
  
          axios(`http://localhost:8080/api/v1/auth/register`, {
            method: "POST", 
            data: {
                firstname:firstname,
                lastname:lastname,
                email :email,
                password :password
            }
          })
            
          .then(response => {
              setUser({isLogin : true})
          })
          .catch(error => {
            handleCloseS();
            handleClick();
              console.log(error)
              
              
             
             
                 
             
          })
          
       }
  
    return (
      <div>
                     < >
              
               
               {isLogin ? ( <div>   
               < Login cartItemCount={cartItemCount} key={isLogin} onLogout={onLogout}/ >  </div> ): 
               
  
               <>
               <Header cartItemCount={cartItemCount}/>
               <MegaMenu/>
               <div className='    wapper ' >
              
              <div className="login rounder">
                  <span className='p'>Register Customer</span>
                  
                  
                  <Stack spacing={2} sx={{ width: '100%' }}>
                  
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    This is Email or Pass error message!
                    </Alert>
                  </Snackbar>
                 
                 
                </Stack>
                <div className="form-group mb-2 was-validated">
                <label htmlFor='text' className='form-label'>Firstname :</label>
                <input type="text" className="form-control" required placeholder="Enter First Name" name="firstname" value={firstname} onChange={(e)=>onInputChange(e)} />
                <div className='invalid-feedback'>
                Please Enter you firstname
                </div>
            </div>
            <div className="form-group mb-2 was-validated">
                <label htmlFor='text' className='form-label'>Lastname :</label>
                <input type="text" className="form-control" required placeholder="Enter Last Name" name="lastname" value={lastname} onChange={(e)=>onInputChange(e)} />
                <div className='invalid-feedback'>
                Please Enter you lastname
                </div>
            </div>
                  
                  <div className="form-group mb-2 was-validated">
                      <label htmlFor='email' className='form-label'>Email :</label>
                      <input type="email" className="form-control" required placeholder="Enter username" name="email" value={email} onChange={(e)=>onInputChange(e)} />
                      <div className='invalid-feedback'>
                      Please Enter you password
                      </div>
                  </div>
  
                  <div className="form-group mb-2 was-validated">
                      <label className='form-label' htmlFor='password'>Password</label>
                      <input type="password" className="form-control" required placeholder="Enter password" name="password" value={password} onChange={(e)=>onInputChange(e)} />
                  </div>
  
                  <div className="form-group mb-2">
                      <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1"  />
                          <label className="custom-control-label " htmlFor="check  ">Remember me</label>
                      </div>
                  
                  </div>
                  <button type="submit" className="btn btn-outline-success" onClick={register}>Register</button>
                 <a href='login'> <button  className="btn btn-outline-success">Login</button></a>
                  <p className="forgot-password text-right">
                      Forgot <a href="#">password?</a>
                  </p>
                
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openSucess}
                    onClick={handleCloseS}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
              </div>
              </div>
  
              </>
            }
           
              </>
      </div>
    )
  }
  
