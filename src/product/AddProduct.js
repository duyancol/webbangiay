
import React,{useState} from 'react'
import axios from "axios"

import { useNavigate } from 'react-router-dom';
export default function AddProduct() {
  let navigate=useNavigate();
  
  const[user,setUser]=useState({
    name:"",
    img : ""

  });
  const{name,img}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  const onSupmit= async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8080/addproduct",user)
    navigate("/")
  }
  return (
    <div>
    Add product
    <form onSubmit={(e)=>onSupmit(e)}>
    <div className='mb-3'>
    <label>Name</label>
    <input name='name' placeholder='Enter your name' className='form-control'value={name} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>IMG</label>
    <input name='img' placeholder='Enter your name' className='form-control' value={img} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
    </div>
  )
}


