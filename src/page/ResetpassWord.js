import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export default function ResetpassWord() {
  let navigate=useNavigate();
  const [openBR, setOpenBR] = React.useState(false);
  const handleCloseBR = () => {
    setOpenBR(false);
  };
  const handleOpenBR = () => {
    setOpenBR(true);
  };
  const[user,setUser]=useState({
    pass:""    
  });
  const{pass}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
    const {token}=useParams();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/auth/reset_password/${token}`)
          .then(response => {
            if(response.data==="reset_password_form"){
                alert("ok")
            }else{
              navigate("/error")
            }
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      const onSupmit= async(e)=>{
        setOpenBR(true)
            const formData = new FormData();
            formData.append('token', token);
            formData.append('passnew', user.pass);
            
            const config = {
              headers: {
                'content-type': `multipart/form-data; boundary=${formData._boundary}`,
              }
            }
            e.preventDefault();
            await axios.put("http://localhost:8080/api/v1/auth/users/updatePass",formData,config)
            navigate("/login")
            setOpenBR(false)

         
           
            
           
          }
  return (
    <div className='    wapper ' >
    <div className="login rounder">
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBR}
        onClick={handleCloseBR}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <span className='p'>Forgot password :</span>
    <form onSubmit={(e)=>onSupmit(e)}>
    <div className='mb-3'>
    <label>Name</label>
    <input name='pass' type='password' placeholder='Enter pass' className='form-control'value={pass} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Price</label>
    <input name='repass' type='password' placeholder='Enter your repass' className='form-control' ></input>
    </div>
 
   
   
    <button type='submit' className='btn btn-primary'>Forgot PassWord</button>
    </form>

    </div>
    </div>
  )
}
