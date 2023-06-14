
import React,{useState} from 'react'
import axios from "axios"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Header from "../layout/Header";
export default function AddProduct(props) {
  const handleAddProductClose = () => {
    // do something
    props.handleClose();
  };
  const handleAddProductSet= () => {
    // do something
    props.handleSet();
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  let navigate=useNavigate();
  
  const[user,setUser]=useState({
    name:"",
    price: 1,
    quantity: 1,
    img : "",
    category: "",
    derectory: ""

  });
  const{name,price,quantity,img,category,derectory}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  const [imageSrc, setImageSrc] = React.useState("");

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setUser({
      ...user,
      img: e.target.files[0]
    });
  }
  const onInputChangeIntPrice = (e) => {
    setUser({
      ...user,
      price: parseInt(e.target.value)
    });
  }
  const onInputChangeIntQuantity = (e) => {
    setUser({
      ...user,
      quantity: parseInt(e.target.value)
    });
  }

  const onSupmit= async(e)=>{
handleOpen()
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('price', user.price);
    formData.append('quantity', user.quantity);
   
    formData.append('img', user.img);
    formData.append('category', user.category);
    formData.append('derectory', user.derectory);
    const config = {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    }
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/auth/addproduct",formData,config)
    const product = { name, img };
    props.handleAddProduct();
    handleClose()
    handleAddProductClose()

    
   
  }
  return (
    <div>
   
    
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    <form onSubmit={(e)=>onSupmit(e)}>
    <div className='mb-3'>
    <label>Name</label>
    <input name='name' placeholder='Enter your name' className='form-control'value={name} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Price</label>
    <input name='price'   min="1" type='number' placeholder='Enter your price' className='form-control'value={price} onChange={(e)=>onInputChangeIntPrice(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Derection</label>
    <input name='derectory'  placeholder='Enter your price' className='form-control'value={derectory} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Quantity</label>
    <input name='quantity'   min="1" type='number' placeholder='Enter your price' className='form-control'value={quantity} onChange={(e)=>onInputChangeIntQuantity(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Category</label>
    <input name='category' placeholder='Enter your price' className='form-control'value={category} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label htmlFor="img">Image</label><br></br>
          <input type="file" id="img" name="img" onChange={handleFileUpload} />
          {imageSrc && <img src={imageSrc} alt="Uploaded Image" />}
    </div>
    <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
    
    </div>
  )
}


