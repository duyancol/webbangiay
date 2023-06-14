import React,{useEffect, useState} from 'react'
import axios from "axios"
import Slideer from '../layout/Slideer';
import Header from '../layout/Header';
import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import Footer from '../layout/Footer';

import { Link } from 'react-router-dom';
import '../css/style.css';
import '../css/test.css';
import FacebookComments from './FacebookComments';
import ButtonPaypal from '../addToCart/ButtonPaypal';
export default function Home({cartItemCount}) {
  const input ="àdsfd";
    const[users,setUsers]=useState([]);
    useEffect(()=>{
       loadUsers();
    },[])
    const loadUsers= async () =>{
        const result=await axios.get("http://localhost:8080/api/v1/auth/students1");
       setUsers(result.data);
        

    };
  return (
    <>
    
    
     <Header cartItemCount={cartItemCount} />
     <MegaMenu></MegaMenu>
     <Slideer></Slideer>
   
   
    <Product input={input}/>
    <Footer></Footer>
    </>
  )
}
