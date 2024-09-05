// import React,{ useState ,useEffect} from 'react'
// import Login from '../page/Login';
// export default function Header() {
//     // const[state,setState]=useState([]);
//     var th=localStorage.getItem("token");
   

//     const logout =()=>{
//       localStorage.removeItem("token");
//      this.props.onLogout();
//   }
//   const onLogout = ()=>{
//       this.setState({isLogin : false})
//   }

//     const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   // const {count}=useParams();
//   const count =document.getElementsByClassName("count").length +3;
//   // Note: the empty deps array [] means
//   // this useEffect will run once
//   // similar to componentDidMount()
  
//   useEffect(() => {
//     fetch("http://localhost:8080/api/v1/auth/get3ProductNew")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       )
//   }, [])
  
//   const clickCart1=()=>{
//     fetch(`http://localhost:8080/getNext3Product/${count}/0`)
//     .then(res => res.json())
//     .then(
//       (result) => {
//         setIsLoaded(true);
//         setItems(result);
//       },
//       // Note: it's important to handle errors here
//       // instead of a catch() block so that we don't swallow
//       // exceptions from actual bugs in components.
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     )
// }

//   return (
//     <div>
   
    
//     <div className="header">
    
//     <div className="top-header">
//         <div className="wrap">
//             <div className="top-header-left" >
//                 <ul>
                    
                    
//                     <li><a className="cart" href="#"  ><span id="clickme" onClick={()=>clickCart()}>  </span></a></li>
                   
//                     <div id="cart">Your Cart is Empty <span>(0)</span></div>
                    
//                     <li><a className="info" href="#"><span> </span></a></li>
//                 </ul>
//             </div>
//             <div className="top-header-center">
//                 <div className="top-header-center-alert-left">
//                     <h3>FREE DELIVERY</h3>
//                 </div>
//                 <div className="top-header-center-alert-right">
//                     <div className="vticker">
//                       <ul>
//                           <li>Applies to orders of $50 or more. <label>Returns are always free.</label></li>
//                       </ul>
//                     </div>
//                 </div>
//                 <div className="clear"> </div>
//             </div>
//             <div className="top-header-right">
//                 <ul>
//                 {th!=null ?  ( <li><a href="login.html">{th}</a> <button onClick={logout}>logout</button><span> </span></li>) :
//                 <li><a href="login">Login</a><span></span></li>
//               }
//                     <li><a href="register.html">Join</a></li>
//                 </ul>
//             </div>
//             <div className="clear"> </div>
//         </div>
//     </div>
//     </div>
   
//     </div>
//   )
// }
// import React, { Component } from "react";


// export default class Login extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           email: "",
//           password: "",
//           isLogin: localStorage.getItem("token")!=null
//       }
//   }
//       logout =()=>{
//       localStorage.removeItem("token");
//   }
   //   this.props.onLogout();
//  

//    th=localStorage.getItem("token");
//    themail=localStorage.getItem("email");
 


//   render() {
//       return (

          
//               <div>
   
    
//     <div className="header">
    
//     <div className="top-header">
//         <div className="wrap">
//             <div className="top-header-left" >
//                 <ul>
                    
                    
//                     <li><a className="cart" href="#"  ><span id="clickme" >  </span></a></li>
                   
//                     <div id="cart">Your Cart is Empty <span>(0)</span></div>
                    
//                     <li><a className="info" href="#"><span> </span></a></li>
//                 </ul>
//             </div>
//             <div className="top-header-center">
//                 <div className="top-header-center-alert-left">
//                     <h3>FREE DELIVERY</h3>
//                 </div>
//                 <div className="top-header-center-alert-right">
//                     <div className="vticker">
//                       <ul>
//                           <li>Applies to orders of $50 or more. <label>Returns are always free.</label></li>
//                       </ul>
//                     </div>
//                 </div>
//                 <div className="clear"> </div>
//             </div>
//             <div className="top-header-right">
//                 <ul>
//                 {this.th!=null ?  ( <li><a href="login.html">{this.themail}</a> <button onClick={this.logout}>logout</button><span> </span></li>) :
//                 <li><a href="login">Login</a><span></span></li>
//               }
//                     <li><a href="register.html">Join</a></li>
//                 </ul>
//             </div>
//             <div className="clear"> </div>
//         </div>
//     </div>
//     </div>
   
//     </div>
          
//       );

// }
// } 

import React,{useState,useEffect} from 'react'
import Login from '../page/Login';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function Header({cartItemCount}) {
  
  const roles = JSON.parse(localStorage.getItem('roles'));
  let navigate=useNavigate();
  
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const items = [
    "Applies to orders of $50 or more.",
    "Returns are always free.",
    "Limited time offer: 20% off!",
    "Check out our new collection!"
  ];
  
    const[user,setUser]=useState({
        email:"",
        img : "",
        isLogin: localStorage.getItem("token")!=null,
       
      });

      const  logout =()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("nameuser");
      onLogout();
    }
    const onDB = ()=>{
      navigate("/doakboard")
  }
   
    const onLogout = ()=>{
        setUser({isLogin : false})
    }
        const clickCart=()=>{
       
        
          if(document.getElementById('cart').style.display.endsWith("none")){
            document.getElementById('cart').style.display="block";
          }else{
            document.getElementById('cart').style.display="none";
          }
          
       
           
       
       
    }

    const th=localStorage.getItem("token");
    const  themail=localStorage.getItem("nameuser");
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentItemIndex(prevIndex => (prevIndex + 1) % items.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [items.length]);
 
  return (
                 <div className='tsh'>
   
    
    <div className="header">
    
    <div className="top-header">
   
        <div className="wrap">
            <div className="top-header-left" >
                <ul>
                    
                    
                    <li><a className="cart"   onClick={clickCart}><span id="clickme" >  </span></a></li><span className='countcart'>{cartItemCount+""}</span>
                   
                    <div id="cart">Your Cart is Empty <span>( {cartItemCount+""}) 
                    <Link className="btn btn-outline-success" type="submit" to="cart">Seen</Link>
                    </span></div>
                    
                    <li><a className="info" href="#"><span> </span></a></li>
                </ul>
            </div>
            <div className="top-header-center">
                <div className="top-header-center-alert-left">
                    <h3>FREE DELIVERY : </h3>
                </div>
                <div className="top-header-center-alert-right">
                    <div className="vticker">
                      <ul>
                      <li className='vticker_li'>{items[currentItemIndex]}<label>{currentItemIndex === 0 && " Returns are always free."}</label></li>                      </ul>
                    </div>
                </div>
                <div className="clear"> </div>
            </div>
            <div className="top-header-right">
           
                <ul>
                
                {th!=null ?  ( roles && roles.length > 0 && roles[0].authority === 'ADMIN' ? (<li><a className='name_user_login' href="login.html">{themail}</a> <button className='button ' onClick={logout}>logout</button><span> </span><button className='button ' onClick={onDB}>Admin</button></li>):<li><a href="login.html">{themail}</a> <button className='button ' onClick={logout}>logout</button><span> </span></li>) :
                <li> <Link className="btn btn-outline-secondary " type="submit" to="login">Login</Link> <span> </span>  <li><a href="register">Join</a></li></li>
              }
                   
                </ul>
            </div>
            <div className="clear"> </div>
        </div>
    </div>
    </div>
   
    </div>
  )
}
