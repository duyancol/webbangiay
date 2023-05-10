
// import React from 'react'


// export default class Login extends React.Component {
//   constructor(props){
//     super(props)
//     this.state={
//       "email" :"",
//       "password" :""
//     }
//   } 
//   setParams =(event)=>{
//     this.setState({[event.target.name] : event.target.value} )
//   }
//   login=()=>{
//     var myHeaders=new Headers();
//     myHeaders.append("Content-Type","application");
//     var urlencoded=new URLSearchParams();
//     urlencoded.append("email","19130057@st.hcmuaf.edu.vn");
//     urlencoded.append("password","1234");
//     var requestOptions={
//       method: 'POST',
//       headers :myHeaders,
//       body :urlencoded,
//       redirect : 'follow'
//     };
//     fetch('http://localhost:8080/api/v1/auth/authenticate',requestOptions)
//     .then(response =>{
//       console.log(response)
//       if(response.ok){
//         return response.json()
//       }
//       throw Error(response.status)
//     })
//     .then(result =>{
//       console.log(result)
//       sessionStorage.setItem("token",result.token)
//       alert("thanh cong")
//     })
//     .catch(error =>{
//       console.log('error',error)
//       alert("Username passs loi")
//     })
//   }
//   render(){
//    return(
//     <div>
//     <form>
//     <div>
//     <label>User name :</label>
//     <input type="text" name='email' onChange={this.setParams}></input>
//     </div>
//     <div>
//     <label>Pass word :</label>
//     <input type="password" name='password' onChange={this.setParams}></input>
//     </div>
//     <div>
   
//     <button  type='button' onClick={this.login}>login</button >
//     </div>
//    </form>
//     </div>
//    )
 
   
    
//   }
// }

 
  

// import React,{useContext,useState} from 'react'
// import Home from './Home';

// import { useNavigate } from 'react-router-dom';

// export default function Login() {
  
//   let navigate=useNavigate();
//   //  const {store,actions} =useContext(Context);
  
//   const[user,setUser]=useState({
//     email:"",
//     password: "",
//     isLogin :sessionStorage.getItem("token")!=null

//   });
//   const{email,password}=user
//   const onInputChange=(e)=>{
//     setUser({...user,[e.target.name]:e.target.value});

//   }
//   const token =sessionStorage.getItem("token");
// console.log("this token",token)
 
//   const handleClick = ()=>{
//     const opts={
//       method: 'POST',
//       headers:{
//         "Content-Type": "application/json"
//       },
//       body : JSON.stringify({
//         "email":email,
//         "password": password
    
//       })
//     };
//     fetch('http://localhost:8080/api/v1/auth/authenticate',opts)
//     .then(resp=>{
//       if(resp.ok){
//                 return resp.json()

//               }
//               throw Error(resp.status)
      
//     })
//     .then(data => {
//       console.log("this....",data)
//       sessionStorage.setItem("token",data.token)


//     // navigate("/")
//     this.setUser({isLogin : true})
      
     
//     })
//     .catch(error=>{
//       console.log('error',error)
          
//            document.getElementById("test").append("Khong thanh cong")
//     })
//   }

//   return (
//     <div>
//     <span id='test'></span>
  
//     Add product
//     {(token && token!="" && token!=undefined )? (<Home key={this.user.isLogin}></Home>) : (
// <div>
// <div className='mb-3'>
//     <label>Email</label>
//     <input  placeholder='Enter your name' name='email' className='form-control'value={email} onChange={(e)=>onInputChange(e)}></input>
//     </div>
//     <div className='mb-3'>
//     <label>Pass</label>
//     <input  placeholder='Enter your name' name='password' className='form-control' value={password} onChange={(e)=>onInputChange(e)}></input>
//     </div>
//     <button type='submit' onClick={handleClick} className='btn btn-primary'>Submit</button>
// </div>
//   )}
    
   
//     </div>
    
//   )
// }





// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import React, { Component,useState } from "react";
// import axios from "axios";
// import Home from "./Home";
// import Header from "../layout/Header";

// import Product from '../layout/Product';
// import MegaMenu from '../layout/MegaMenu';
// import Footer from '../layout/Footer';
// import { Link } from '@mui/material';





// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             isLogin: localStorage.getItem("token")!=null,
           
//         }
//     }
  
//     logout =()=>{
//         localStorage.removeItem("token");
//         localStorage.removeItem("email");
//         this.onLogout();
//     }
//     onLogout = ()=>{
//         this.setState({isLogin : false})
//     }

//     handleChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value,
//         })
//     }
    
//     login = () => {
//         const {email, password} = this.state;

//         axios(`http://localhost:8080/api/v1/auth/authenticate`, {
//           method: "POST", 
//           data: {
//               email,
//               password,
//           }
//         })
          
//         .then(response => {
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('email', response.data.email);
//             console.log(response);
//             this.setState({isLogin : true})
//         })
//         .catch(error => {
//             console.log(error)
            
//             document.getElementById("test").style.display="block"
           
               
           
//         })
        
//      }

     
     
   
     
      

  

  

//     render() {
//         return (

            
//              < >
            
             
//              {this.state.isLogin ? ( <div>  <Link className="btn btn-outline-success" type="submit" to="addProduct">Add Product</Link> <Header onLogout={this.onLogout}></Header>
//              <MegaMenu></MegaMenu>< Product key={this.state.isLogin} onLogout={this.onLogout}/ >  </div> ): 
             

//              <>
//              <Header/>
//              <MegaMenu/>
//             <div className="log">
//                 <h3>Sign In</h3>
//                 <div id='test'>
//                 <Alert severity="error">This is an error {this.state.email} and password not value — check it out!</Alert>
//                  </div>
//                 <div className="form-group">
//                     <label>Username</label>
//                     <input type="email" className="form-control" placeholder="Enter username" name="email" value={this.state.email} onChange={this.handleChange} />
//                 </div>

//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange} />
//                 </div>

//                 <div className="form-group">
//                     <div className="custom-control custom-checkbox">
//                         <input type="checkbox" className="custom-control-input" id="customCheck1"  />
//                         <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//                     </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Submit</button>
//                 <p className="forgot-password text-right">
//                     Forgot <a href="#">password?</a>
//                 </p>
               
//             </div>
//             </>
//           }
//           <Footer></Footer>
//             </>
            
//         );

// }
// } 

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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Login({cartItemCount}) {
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

        axios(`http://localhost:8080/api/v1/auth/authenticate`, {
          method: "POST", 
          data: {
              email :email,
              password :password
          }
        })
          
        .then(response => {
          
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('nameuser', response.data.lastname + response.data.firstname);
            localStorage.setItem('id', response.data.id);
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
                <button type="submit" className="btn btn-outline-success" onClick={login}>Submit</button>
                
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


