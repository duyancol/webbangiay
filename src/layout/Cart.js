// import { Cookie } from '@mui/icons-material';
// import axios from 'axios';
// import React,{useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import Cookies from 'universal-cookie';
// export default function Cart() {
  
//   const cookies = new Cookies();
//     const[user,setUser]=useState({
//       "product": null,
//       "productList": [
//           {
//               "quantitySol": 1,
//               "id": 3,
//               "name": "sp3",
//               "price": 10,
//               "quantity": 10,
//               "img": "images/product4.jpg",
//               "category": "sp moi",
//               "derectory": "san pham moi"
//           }
//       ],
//       "totalName1": "sp3",
//       "totalPrice1": 1
    
//       });
//       var c = sessionStorage.getItem("cart");
//        const {id}=useParams();
//       useEffect(()=>{
   
// clickCart2()
//       },[])
      
//       // const loadProduct1=async()=>{
//       //   const result=await axios.get(`http://localhost:8080/api/v1/auth/addCart/2`)
//       //   setUser(result.data)
//       //   console.log(result.data)
//       // }
//       const loadProduct=async()=>{
//         cookies.set('JSESSIONID', '14A4C26E22AEFEF5A108F6FEFC978BED', { path: '/' });
//         const result=await axios.get(`http://localhost:8080/api/v1/auth/addCart/${id}`)
//        console.log(result.data)
       
       
//       }
     
     
//         const add=()=>{
//           cookies.set('JSESSIONID', '14A4C26E22AEFEF5A108F6FEFC978BED', { path: '/' });
       
//           fetch(`http://localhost:8080/api/v1/auth/addCart/${id}`, {
//             method: "GET",
          
//           })
//             .then(res => {
//               alert(res.data)
//               console.log(res.data);
//              // setUser(res.data)
//               const jsessionid = document.cookie;
//               console.log("id", jsessionid);
//               //Here I am trying to get the jsessionid
//             })
//             .catch(error => console.log(error));
//           }
//           const setCart = () => {
      

//             axios(`http://localhost:8080/api/v1/auth/addCart/${id}`, {
//               method: "GET", 
             
//             })
//             .then(res => res.json())
//             .then(response => {
               
//                 console.log(response);
//                 alert(response)
//             })
//             .catch(error => {
//                alert("loi")
               
                   
               
//             })
            
//          }
//           const clickCart2=()=>{
//             cookies.set('JSESSIONID', '14A4C26E22AEFEF5A108F6FEFC978BED', { path: '/' });
//             fetch(`http://localhost:8080/api/v1/auth/addCart/${id}`,{
//               method: "POST"
//             })
            
            
//             .then(res => res.json())
//             .then(
//               (result) => {
//                 console.log(result.data)
//                 setUser(result)
//               },
//               // Note: it's important to handle errors here
//               // instead of a catch() block so that we don't swallow
//               // exceptions from actual bugs in components.
//               (error) => {
               
//               }
//             )}

     
      
//   return (
//     <div>
//     {user.productList.map((row) => (
//    <div>{row.id}</div>

     
//     ))}
   
//     <button onClick={setCart}> add </button>
//     </div>
//   )
// }
import React, { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";





export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  }, []);
  return (
    <div>
   
    <h2>Giỏ hàng</h2>
   <ul>
     {cart.map(item => (
       <li key={item.id}>
         <span>{item.name}</span>
         <span>{item.price}</span>
         
       </li>
     ))}
   </ul>
 
  </div>
  )
}

