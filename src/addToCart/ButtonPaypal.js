import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useEffect, useState } from 'react'; 
const ButtonPaypal=({getTotal,userForm,cartItems})=>{
  const [paidFor,setPaidFor]=useState()
  const [error,setError]=useState(null)
  const saveCart = () => {
    
    if (!userForm.name || !userForm.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
   
    axios.post("http://localhost:8080/api/v1/auth/save", {cart: userForm, listProduct: cartItems})
      .then((response) => {
        console.log(response.data);
        alert("Đã lưu giỏ hàng thành công!");
      
        
      })
      .catch((error) => {
        console.log(error);
        alert("Lưu giỏ hàng thất bại!");
      });
  };
    const product ={
        description :"NIKE",
        price :getTotal
    };
    const handleApprove=(orderID)=>{

      setPaidFor(true)
      saveCart()

    }
    if(paidFor){
     
    }
    if(error){
      alert(error)
    }


    return (
        <div>
          <PayPalButtons style={{
            color:"silver",
            layout:"horizontal",
            height:40,
            tagline:false,
            shape:"pill"
          }}
          onClick={(data,actions)=>{
            const hasAl=false;
            if(hasAl){
              setError(" You alrealy bought this course. Go to your account to view your list of courses")
              return actions.reject()
            }else{
              return actions.resolve()
            }
            
          }}
           createOrder={(data,actions)=>{
            return actions.order.create({
              purchase_units :[{
                description:product.description,
                amount :{
                  value:product.price
                }
              }]
            })
          }}
          onApprove={async(data,actions)=>{
            const order =await actions.order.capture();
            console.log("order",order)
            handleApprove(data.orderID);
          }}
          onCancel={()=>{

          }}
          onError={(err)=>{
            setError(err)
            console.error("PayPal Checkout Error")

          }}
          ></PayPalButtons>
        </div>
      )
}
export default ButtonPaypal;

