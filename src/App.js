import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';

import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from './Demo';
import AddProduct from './product/AddProduct';
import EditProduct  from './product/EditProduct';
import ViewProduct from './product/ViewProduct';
import Header from './layout/Header';
import Slideer from './layout/Slideer';
import Footer from './layout/Footer';
import Product from './layout/Product';
import MegaMenu from './layout/MegaMenu';
import Search from './layout/Search';
import Home from './page/Home';
import Login from './page/Login';
import { Link } from 'react-router-dom';
import DetailProduct from './layout/DetailProduct';
import ListProduct from './addToCart/ListProduct';
import Cart from './addToCart/Cart';
import ProductDetail from './addToCart/ProductDetail';
import ProductList from './addToCart/ProductList ';

function App() {
  const[user,setUser]=useState({
    isLogin: localStorage.getItem("token")!=null
  });
  const onLogout = ()=>{
    setUser({isLogin : false})
}

const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);
const [cartItems, setCartItems] = useState([]);
const [oder, setOrder] = useState(
  {
    "cart": {
      "userID": "testID",
      "address": "Long An",
      "status": "0",
      "price": "100"
    },
    "listProduct":
    cartItems
  }

);

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const handleAddToCart = product => {
    const existingCartItem = cartItems.find(item => item.id === product.id);
    if (existingCartItem) {
      setCartItems(prevCartItems => {
        const newCartItems = prevCartItems.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return newCartItems;
        alert("Da them vao gio hang !");
      });
    } else {
      setCartItems(prevCartItems => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
      alert("Da them vao gio hang !");
    }
  
  };
   const handleRemoveCartItem = product => {
  setCartItems(prevCartItems =>
    prevCartItems.filter(item => item.id !== product.id)
  );
};
//   const saveCart = () => {
//     axios.post("http://localhost:8080/api/v1/auth/save", cart)
//       .then((response) => {
//         console.log(response.data);
//         alert("Đã lưu giỏ hàng thành công!");
//         localStorage.removeItem("cart")
//         setCart([]);
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Lưu giỏ hàng thất bại!");
//       });
//   };
//   const handleRemoveProduct = (id) => {
//     const updatedCartItems = cart.filter(item => item.id !== id);
//     setCart(updatedCartItems);
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems));
//   }
//   const addToCart = (product) => {
//     const newCart = [...cart];
//     const itemIndex = newCart.findIndex(item => item.id === product.id);
//     if (itemIndex < 0) {
//       newCart.push({ ...product, quantity: 1 });
//     } else {
//       newCart[itemIndex].quantity += 1;
//     }
//     localStorage.setItem('cart', JSON.stringify(newCart));
//     // const savedCart = localStorage.getItem('cart');
//     // if (savedCart) {
//     //   setCart(JSON.parse(savedCart));
//     // }
//      setCart(newCart);
//   };
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     } else {
//       setCart([]);
//     }
//   }, []);
// const[user,setUser]=useState({
//   email:"",
//   img : "",
//   isLogin: localStorage.getItem("token")!=null

// });
// const  logout =()=>{
// localStorage.removeItem("token");

// onLogout();
// }
// const onLogout = ()=>{
//   setUser({isLogin : false})
// }
// const addToCart1 = (product) => {
//   const newCartItems = [...cartItems];
//   const existingCartItem = newCartItems.find((item) => item.id === product.id);
//   if (existingCartItem) {
//     existingCartItem.quantity++;
//   } else {
//     newCartItems.push({ ...product, quantity: 1 });
//   }
//   setCartItems(newCartItems);
// };
  return (
    
    <div className="App" key={user.isLogin}>  
      <Router>
      
        <Routes>
          
          <Route exact path='/' element={<Home/> }> </Route>
          <Route className="node"  path='/getProduct/:id' element={<ViewProduct />}></Route>
          <Route exact path='/login' element={<Login/>}> </Route>
          <Route exact path='/addProduct' element={<AddProduct/>}></Route>
         
         
          <Route className="node" exact path='/getProduct/:id' element={<ViewProduct/>}></Route>
         
          
          
          <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route exact path='/detailProduct/:id' element={<DetailProduct/>}></Route>
          <Route exact path='/editProduct/:id' element={<EditProduct/>}></Route>
          <Route path="/cart" element={
                  <Cart cartItems={cartItems} setCartItems={setCartItems}
                  onRemoveCartItem={handleRemoveCartItem}
                  onsetCart={setCartItems}
                  oder={oder}
                   />
                 
                } />
         
        </Routes> 
    
     
        
      </Router>
     
      
    </div>
  
  );
};

export default App;



// import React, { useState,useEffect  } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Cart from './addToCart/Cart';
// import ProductDetail from './addToCart/ProductDetail';
// import ProductList from './addToCart/ProductList ';
// import { Link } from 'react-router-dom';

// function App() {
// const [cartItems, setCartItems] = useState([]);

// useEffect(() => {
//   const cartItemsFromStorage = localStorage.getItem('cartItems');
//   if (cartItemsFromStorage) {
//     setCartItems(JSON.parse(cartItemsFromStorage));
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// }, [cartItems]);
// const handleAddToCart = product => {
//   const existingCartItem = cartItems.find(item => item.id === product.id);
//   if (existingCartItem) {
//     setCartItems(prevCartItems => {
//       const newCartItems = prevCartItems.map(item => {
//         if (item.id === product.id) {
//           return { ...item, quantity: item.quantity + 1 };
//         }
//         return item;
//       });
//       return newCartItems;
//     });
//   } else {
//     setCartItems(prevCartItems => [
//       ...prevCartItems,
//       { ...product, quantity: 1 },
//     ]);
//   }

// };
 
// // useEffect(() => {
// //   const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
// //   if (storedCartItems) {
// //     setCartItems(storedCartItems);
// //   }
// // }, []);

// // useEffect(() => {
// //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// // }, [cartItems]);
// // const handleRemoveCartItem = (id) => {
// //   setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
// // };
// const handleRemoveCartItem = product => {
//   setCartItems(prevCartItems =>
//     prevCartItems.filter(item => item.id !== product.id)
//   );
// };

// // const handleAddToCart = product => {
// // const existingCartItem = cartItems.find(item => item.id === product.id);
// //   if (existingCartItem) {
// // setCartItems(prevCartItems => {
// // const newCartItems = prevCartItems.map(item => {
// // if (item.id === product.id) {
// // return { ...item, quantity: item.quantity + 1 };
// // }
// // return item;
// // });
// // return newCartItems;
// // });
// // } else {
// // setCartItems(prevCartItems => [
// // ...prevCartItems,
// // { ...product, quantity: 1 },
// // ]);
// // }
// // };
// // // useEffect(() => {
// // //   const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
// // //   if (storedCartItems) {
// // //     setCartItems(storedCartItems);
// // //   }
// // // }, []);

// // // useEffect(() => {
// // //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
// // // }, [cartItems]);
// return (

// <Router>
// <div>
//   <nav>
//     <ul>
//       <li>
//         <Link to="/">Product List</Link>
//       </li>
//       <li>
//         <Link to="/cart">Cart</Link>
//       </li>
//     </ul>
//   </nav>
//   <Routes>
//     <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
//     <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
//     <Route path="/cart" element={
//       <Cart cartItems={cartItems} setCartItems={setCartItems}
//       onRemoveCartItem={handleRemoveCartItem}
//        />
     
//     } />
//   </Routes>
// </div>
// </Router>
// );
// }

// export default App;




