
import React from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/info.css';
import '../css/preloader.css';
import '../css/checkout.css';
import { Helmet } from 'react-helmet';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MegaMenu from '../layout/MegaMenu';
function Cart({cartItems,onRemoveCartItem,setCartItems,oder}) {
  // const { cartItems } = props;
  const test = () => {
    alert(localStorage.getItem('cartItems'))
  }

  const handleRemoveCartItem = item => {
    onRemoveCartItem(item);
  };
  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };
    const saveCart = () => {
    axios.post("http://localhost:8080/api/v1/auth/save", oder)
      .then((response) => {
        console.log(response.data);
        alert("Đã lưu giỏ hàng thành công!");
        localStorage.removeItem("cartItems")
        setCartItems([]);
      })
      .catch((error) => {
        console.log(error);
        alert("Lưu giỏ hàng thất bại!" +    "           "+ cartItems);
      });
  };
  const handleQuantityChange = (event, product) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity <= 0) {
      handleRemoveCartItem(product);
      return;
    }
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  return (
    <div>
    <Header />
    <MegaMenu></MegaMenu>
    <Helmet>
    <link rel="stylesheet" href="../css/checkout.css" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../css/preloader.css" />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    />
    </Helmet>
    
   
      <h1 className='hc1'>Cart</h1>
      <div class="row2">
        <div class="column">
          <h1 className='hyod'>Your Order</h1>
          <h5>Please select the quantity below</h5>
          {cartItems.map(item => (
          <div class="cart-item" id="item">
            <img src={"../"+item.img} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e, item)}
          />
            <button onClick={() => handleRemoveCartItem(item)} id="remove" class="remove">
              <i class="fas fa-trash fa-2x"></i>
            </button>
          </div>
          
          ))}
          <hr />
        </div>
        <div class="column2">
          <h3 className='h3'>Cart Totals</h3>
          <div class="row2 row3">
            <div class="col">
              <h5>Subtotals</h5>
              <h5>Shipping</h5>
            </div>
            <div class="col">
              <h5>$199</h5>
              <div class="wrapper">
                <span className='span_cart'>
                  <input type="radio" name="shipping" id="" checked />Flat
                  rate:$10
                </span>
                <span className='span_cart'>
                  <input type="radio" name="shipping" id="" />Free Shipping
                  <br />
                </span>
                <span className='span_cart'>
                  <input type="radio" name="shipping" id="" />Local Pickup
                </span>
                <span className='span_cart'
                 >Shipping options <br />
                  will be updated <br />during checkout.</span
>
              </div>
            </div>
          </div>
          <h3 className='h3'>Totals &nbsp; &nbsp; $1000</h3>
          <div class="buttons">
            <a class="button-checkout" onClick={() => saveCart()}>Checkout</a>
            <a class="cancel" href="/">Continue Shopping</a>
          </div>
        </div>
      </div>
    <Footer></Footer>
    
    </div>
  );
}

export default Cart;