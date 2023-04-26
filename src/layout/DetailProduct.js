import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

export default function DetailProduct() {

  const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/auth/getProduct/${id}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const addToCart = (product) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex(item => item.id === product.id);
    if (itemIndex < 0) {
      newCart.push({ ...product, quantity: 1 });
    } else {
      newCart[itemIndex].quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(newCart));
    // const savedCart = localStorage.getItem('cart');
    // if (savedCart) {
    //   setCart(JSON.parse(savedCart));
    // }
   
   
      
    
     setCart(newCart);

     
    
  };
  let navigate=useNavigate();
   
      const {id}=useParams();
    
     
      

     
     
        
    
    
      
  return (
   <>
   <div>
   <h1>Danh sách sản phẩm</h1>
   <ul>
    
       <li key={products.id}>
         {products.name} - {products.price}
         <button onClick={() => addToCart(products)}>Thêm vào giỏ hàng</button>
        
       </li>
    
   </ul>
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
 
   </>
  )
}
