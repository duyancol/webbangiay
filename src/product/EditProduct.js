
import React,{useEffect, useState} from 'react'
import axios from "axios"

import { useNavigate, useParams } from 'react-router-dom';
export default function EditProduct() {
  let navigate=useNavigate();
  const {id}=useParams();
  const[user,setUser]=useState({
    name:"",
    img : ""

  });
  const{name,img}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  useEffect(()=>{
    loadUser()
  },[])
  const onSupmit= async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/auth/editProduct/${id}`,user)
    navigate("/")
  }
  const loadUser =async()=>{
    const result=await axios.get(`http://localhost:8080/api/v1/auth/getProduct/${id}`);
    setUser(result.data)
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


