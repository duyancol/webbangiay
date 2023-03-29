import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

export default function ViewProduct() {
    const[user,setUser]=useState({
        name:"",
        img : ""
    
      });
      const {id}=useParams();
      useEffect(()=>{
        loadProduct();

      },[])
      const loadProduct=async()=>{
        const result=await axios.get(`http://localhost:8080/api/v1/auth/getProduct/${id}`)
        setUser(result.data)
      }

  return (
    <div>
    <div className='cart'>
    <div className='cart-header'>
    Details of product by id
    <ul className='list-group list-group-flush'>
    <li className='list-group-item'>
    <b>Name :{user.name} </b>
    </li>
    <li className='list-group-item'>
    <b>Img :{user.img}</b>
    </li>
    </ul>
    </div>
    </div>
      
    </div>
  )
}
