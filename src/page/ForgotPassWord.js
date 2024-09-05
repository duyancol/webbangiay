import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ForgotPassWord() {
  const [open, setOpen] = React.useState(false);
  const [openBR, setOpenBR] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  let navigate=useNavigate();
  const[user,setUser]=useState({
    email:""    
  });
  const{email}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  
    const onSupmit= async(e)=>{
      setOpenBR(true)
       
      const formData = new FormData();
     
      formData.append('email', user.email);
      
      const config = {
        headers: {
          'content-type': `multipart/form-data; boundary=${formData._boundary}`,
        }
      }
      e.preventDefault();
      await axios.get(`http://localhost:8080/api/v1/auth/users/forotPass?email=${email}`,formData,config)
      setOpenBR(false)
      setOpen(true)
     
   
     
      
     
    }
    const handleCloseBR = () => {
      setOpenBR(false);
    };
    const handleOpenBR = () => {
      setOpenBR(true);
    };
  return (
    <div className='    wapper ' >
    <div className='login rounder'>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBR}
        onClick={handleCloseBR}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
   
    <form  onSubmit={(e)=>onSupmit(e)}>
   
   
    <div className="form-group mb-2 was-validated f">
    <label htmlFor='email' className='form-label'>Email :</label>
    <input name='email' type='email' placeholder='Email ' className='form-control'value={email} onChange={(e)=>onInputChange(e)}></input>
    <div className='invalid-feedback'>
    Please Enter you Email 
    </div>
</div>
   
   
    <button type='submit' className='btn btn-primary'>ForgetPassWord</button>
    </form>

    </div>
    <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        Check mail !
      </Alert>
    </Snackbar>
    
  </Stack>
    </div>
  )
}
