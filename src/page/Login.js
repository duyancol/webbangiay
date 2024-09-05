

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
import { useNavigate } from 'react-router-dom';
import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import ButtonLoginWithGG from '../addToCart/ButtonLoginWithGG';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { googleLogout } from '@react-oauth/google';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login({cartItemCount}) {
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  let navigate=useNavigate();
  const handleDB = () => {
    navigate("/doakboard")
  };
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
        email:"",
        password : "",
        isLogin: localStorage.getItem("token")!=null
    
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

    // const handleChange = (e) => {
    //     setUser({
    //         [e.target.name]: e.target.value,
    //     })
    // }
    const{email,password,isLogin}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  
    const login = () => {
      handleOpen()

        axios(`https://shop-shoe-1-heb5.onrender.com/api/v1/auth/authenticate`, {
          method: "POST", 
          data: {
              email :email,
              password :password
          }
        })
          
        .then(response => {
          
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('nameuser', response.data.lastname +" "+ response.data.firstname);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('email_tk', response.data.email);
            localStorage.setItem('roles', JSON.stringify(response.data.roles));
            const roles = JSON.parse(localStorage.getItem('roles'));

// Kiểm tra giá trị roles
if (roles && roles.length > 0 && roles[0].authority === 'USER') {
  // Trường hợp roles có giá trị và authority là 'USER'
  // Thực hiện các công việc cần thiết ở đây
 navigate("/")
} else {
  // Trường hợp khác
  
  setOpenD(true)
}


            // setUser({isLogin : true})
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
             < Home cartItemCount={cartItemCount} key={isLogin} onLogout={onLogout}/ >  </div> ): 
             

             <>
             <Header cartItemCount={cartItemCount}/>
             <MegaMenu/>
             <div className='    wapper ' >
            
            <div className="login rounder">
                <span className='p'>Sign In</span>
                
                
                <Stack spacing={2} sx={{ width: '100%' }}>
                
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  This is Email or Pass error message!
                  </Alert>
                </Snackbar>
               
               
              </Stack>
                
              
            <Dialog
              open={openD}
              onClose={handleCloseD}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
              Hello Admin {localStorage.getItem("nameuser")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                 You want go to page Admin setting ? Choose Agree continute !
                </DialogContentText>
                <img src='https://ui4free.com/storage/public/images/light-dark-setting-screen-figma-design_1623033314_thumb.jpg'></img>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseD}>Disagree</Button>
                <Button onClick={handleDB} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
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
                <button type="submit" className="btn btn-outline-success btn-submit" onClick={login}>Submit</button>
                <GoogleOAuthProvider clientId="296410397096-13ujm0dvd47r6ioghsh637i09l6nbt37.apps.googleusercontent.com"> <GoogleLogin
                onSuccess={credentialResponse => {
                  handleOpen()
                  var decode =jwt_decode(credentialResponse.credential)
              
                   localStorage.setItem('1234567',JSON.stringify(decode));
                   localStorage.setItem('6543217',JSON.stringify(credentialResponse.credential));
                   localStorage.setItem('token', credentialResponse.credential);
                   setUser({isLogin : true})
                    // fetch('http://localhost:8080/api/v1/auth/google', { method: 'POST', body: JSON.stringify({ googleIdToken: credentialResponse.credential }) });
                    
        axios(`https://shop-shoe-1-heb5.onrender.com/api/v1/auth/google/${credentialResponse.credential}`, {
          method: "POST", 
         
        })
          
        .then(response => {
            localStorage.setItem('nameuser', response.data.firstname);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('email_tk', response.data.email);
            localStorage.setItem('roles', JSON.stringify(response.data.authorities));
            const roles = JSON.parse(localStorage.getItem('roles'));
            if (roles && roles.length > 0 && roles[0].authority === 'USER') {
              // Trường hợp roles có giá trị và authority là 'USER'
              // Thực hiện các công việc cần thiết ở đây
             navigate("/")
            }
        })
                  console.log("test 1243443 : ",decode)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
              ;
              </GoogleOAuthProvider>;
                <p className="forgot-password text-right">
                    Forgot <Link className="wishlist" to="/fogotPassWord">password?</Link>
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


