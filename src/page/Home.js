import React,{useEffect, useState} from 'react'
import axios from "axios"
import Slideer from '../layout/Slideer';
import Header from '../layout/Header';
import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import Footer from '../layout/Footer';
import Demo from '../Demo';
export default function Home() {
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
     <Header/>
     <MegaMenu></MegaMenu>
     <Demo/>
    <Product/>
    <Footer></Footer>
    </>
  )
}
