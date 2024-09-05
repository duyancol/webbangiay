
import axios from 'axios';
import React,{useState} from 'react'
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
export default function FeedBack() {
  const [openBR, setOpenBR] = React.useState(false);
  const handleCloseBR = () => {
    setOpenBR(false);
  };
  const handleOpenBR = () => {
    setOpenBR(true);
  };
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
  let navigate=useNavigate();
    const[feed,setFeed]=useState({
        email:"",
        content : ""
      });
      const{email,content}=feed
  const onInputChange=(e)=>{
    setFeed({...feed,[e.target.name]:e.target.value});

  }
  const onSupmit= async(e)=>{
   setOpenBR(true)
        const formData = new FormData();
        formData.append('email', feed.email);
        formData.append('content', feed.content);
        
        const config = {
          headers: {
            'content-type': `multipart/form-data; boundary=${formData._boundary}`,
          }
        }
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/auth/postFeedBack",formData,config)
       setOpenBR(false)
       setOpen(true)

     
       
        
       
      }
  return (
    <div>
    <div class="bg-contact100">
    <div class="container-contact100">
    <div class="wrap-contact100">
    <div class="contact100-pic js-tilt" data-tilt="">
    
    </div>
    <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBR}
    onClick={handleCloseBR}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
    <form class="contact100-form validate-form" onSubmit={(e)=>onSupmit(e)}>
    <span class="contact100-form-title">
    Get in touch
    </span>
    <div class="wrap-input100 validate-input" data-validate="Name is required">
    <input class="input100" type="text" name="name" placeholder="Name"/>
    <span class="focus-input100"></span>
    <span class="symbol-input100">
    <i class="fa fa-user" aria-hidden="true"></i>
    </span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
    <input class="input100" type="text" name="email" placeholder="Email"  value={email} onChange={(e)=>onInputChange(e)}/ >
    <span class="focus-input100"></span>
    <span class="symbol-input100">
    <i class="fa fa-envelope" aria-hidden="true"></i>
    </span>
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
    </div>
    </div>
    </div>
    <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        This is Contact success message , Please check you mail in the next few hours !
      </Alert>
    </Snackbar>
    
  </Stack>
</div>
    
  )
}
