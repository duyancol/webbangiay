import React,{ useState ,useEffect} from 'react'
export default function Header() {
    // const[state,setState]=useState([]);
    var th=localStorage.getItem("token");
    const clickCart=()=>{
          if(document.getElementById('cart').style.display.endsWith("none")){
            document.getElementById('cart').style.display="block";
          }else{
            document.getElementById('cart').style.display="none";
          }
    }
 
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  // const count =document.getElementsByClassName("count").length +3;
  
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/get3ProductNew")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
//   const clickCart1=()=>{
//     fetch(`http://localhost:8080/getNext3Product/${count}/0`)
//     .then(res => res.json())
//     .then(
//       (result) => {
//         setIsLoaded(true);
//         setItems(result);
//       },
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     )
// }
 
  return (
    <div>
   
    
    <nav id="header-nav" class="navbar navbar-expand-lg px-3 mb-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">
            <img src="images/main-logo.png" class="logo"></img>
          </a>
          <button class="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <svg class="navbar-icon">
              <use xlink:href="#navbar-icon"></use>
            </svg>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
            <div class="offcanvas-header px-4 pb-0">
              <a class="navbar-brand" href="index.html">
                <img src="images/main-logo.png" class="logo"></img>
              </a>
              <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
            </div>
            <div class="offcanvas-body">
              <ul id="navbar" class="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link me-4 active" href="#billboard">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="#company-services">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="#mobile-products">Products</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="#smart-watches">Watches</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="#yearly-sale">Sale</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link me-4" href="#latest-blog">Blog</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link me-4 dropdown-toggle link-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Pages</a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="about.html" class="dropdown-item">About</a>
                    </li>
                    <li>
                      <a href="blog.html" class="dropdown-item">Blog</a>
                    </li>
                    <li>
                      <a href="shop.html" class="dropdown-item">Shop</a>
                    </li>
                    <li>
                      <a href="cart.html" class="dropdown-item">Cart</a>
                    </li>
                    <li>
                      <a href="checkout.html" class="dropdown-item">Checkout</a>
                    </li>
                    <li>
                      <a href="single-post.html" class="dropdown-item">Single Post</a>
                    </li>
                    <li>
                      <a href="single-product.html" class="dropdown-item">Single Product</a>
                    </li>
                    <li>
                      <a href="contact.html" class="dropdown-item">Contact</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <div class="user-items ps-5">
                    <ul class="d-flex justify-content-end list-unstyled">
                      <li class="search-item pe-3">
                        <a href="#" class="search-button">
                          <svg class="search">
                            <use xlink:href="#search"></use>
                          </svg>
                        </a>
                      </li>
                      <li class="pe-3">
                        <a href="#">
                          <svg class="user">
                            <use xlink:href="#user"></use>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="cart.html">
                          <svg class="cart">
                            <use xlink:href="#cart"></use>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
   
    </div>
// <div className="header">
    
    // <div className="top-header">
    //     <div className="wrap">
    //         <div className="top-header-left" >
    //             <ul>
                    
                    
    //                 <li><a className="cart" href="#"  ><span id="clickme" onClick={()=>clickCart()}>  </span></a></li>
                   
    //                 <div id="cart">Your Cart is Empty <span>(0)</span></div>
                    
    //                 <li><a className="info" href="#"><span> </span></a></li>
    //             </ul>
    //         </div>
    //         <div className="top-header-center">
    //             <div className="top-header-center-alert-left">
    //                 <h3>FREE DELIVERY</h3>
    //             </div>
    //             <div className="top-header-center-alert-right">
    //                 <div className="vticker">
    //                   <ul>
    //                       <li>Applies to orders of $50 or more. <label>Returns are always free.</label></li>
    //                   </ul>
    //                 </div>
    //             </div>
    //             <div className="clear"> </div>
    //         </div>
    //         <div className="top-header-right">
    //             <ul>
    //             {th!=null ?  ( <li><a href="login.html">{th}</a><button></button> <span> </span></li>) :
    //             <li><a href="login">Login</a></li>
    //           }
                
                    
    //                 <li><a href="register">Join</a></li>
    //             </ul>
    //         </div>
    //         <div className="clear"> </div>
    //     </div>
    // </div>
    // </div>

    /////////////////
    
  )
}
