import React,{ useState ,useEffect} from 'react'
import Login from './Login';

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
  // const {count}=useParams();
  const count =document.getElementsByClassName("count").length +3;
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/auth/get3ProductNew")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  const clickCart1=()=>{
    fetch(`http://localhost:8080/getNext3Product/${count}/0`)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
}
 
  return (
    <div>
   
    
    <div className="header">
    
    <div className="top-header">
        <div className="wrap">
            <div className="top-header-left" >
                <ul>
                    
                    
                    <li><a className="cart" href="#"  ><span id="clickme" onClick={()=>clickCart()}>  </span></a></li>
                   
                    <div id="cart">Your Cart is Empty <span>(0)</span></div>
                    
                    <li><a className="info" href="#"><span> </span></a></li>
                </ul>
            </div>
            <div className="top-header-center">
                <div className="top-header-center-alert-left">
                    <h3>FREE DELIVERY</h3>
                </div>
                <div className="top-header-center-alert-right">
                    <div className="vticker">
                      <ul>
                          <li>Applies to orders of $50 or more. <label>Returns are always free.</label></li>
                      </ul>
                    </div>
                </div>
                <div className="clear"> </div>
            </div>
            <div className="top-header-right">
                <ul>
                {th!=null ?  ( <li><a href="login.html">{th}</a><button></button> <span> </span></li>) :
                <li><a href="login">Login</a></li>
              }
                
                    
                    <li><a href="register">Join</a></li>
                </ul>
            </div>
            <div className="clear"> </div>
        </div>
    </div>
    </div>
   
    </div>
  )
}
