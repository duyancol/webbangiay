
import React,{useEffect, useState} from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/info.css';
import '../css/preloader.css';
import '../css/checkout.css';
import { Helmet } from 'react-helmet';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MegaMenu from '../layout/MegaMenu';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextArea from 'antd/es/input/TextArea';
import { Label } from '@mui/icons-material';
import { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonPaypal from './ButtonPaypal';

// Khai báo ref cho các input
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Cart({cartItems,onRemoveCartItem,setCartItems,oder,cartItemCount,getTotalPrice,setCartItemCount}) {
  const [open, setOpen] = React.useState(false);
  const [userID, setUserID] = React.useState(localStorage.getItem("id"));
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [derection, setDerection] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [openf, setOpenf] = React.useState(false);
  const [openBR, setOpenBR] = React.useState(false);
  const [paidFor,setPaidFor]=React.useState()
  const [error,setError]=React.useState(null)


  const [cities, setCities] = useState([]);
const [selectedCity, setSelectedCity] = useState("");
const [districts, setDistricts] = useState([]);
const [selectedDistrict, setSelectedDistrict] = useState("");
const [wards, setWards] = useState([]);
const [selectedWard, setSelectedWard] = useState("");


useEffect(() => {
  axios.get("http://localhost:3002/api").then((response) => {
    setCities(response.data);
    localStorage.setItem('City',JSON.stringify(response.data));
    console.log()
  });
}, []);

useEffect(() => {
  const fetchDistricts = async () => {
    if (selectedCity !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3002/open-api?selectedCity=${selectedCity}`
        );
        setDistricts(response.data.districts);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  fetchDistricts();
}, [selectedCity]);

useEffect(() => {
  const fetchWards = async () => {
    if (selectedDistrict !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3002/open-api-se?selectedDistrict=${selectedDistrict}`
         
        );
     
        setWards(response.data.wards);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    } else {
      setWards([]);
    }
  };

  fetchWards();
}, [selectedDistrict]);


const handleCityChange = (event) => {
  const selectedCityValue = event.target.value;
  setSelectedCity(selectedCityValue);
  const liscity=localStorage.getItem("City");
  const data = cities
  
  const foundData = data.find(item => item.code === parseInt(selectedCityValue));
  const cityname = foundData ? foundData.name : "Not found";
  localStorage.setItem('selectedCity', cityname);
  setSelectedDistrict(""); // Đặt giá trị của selectedDistrict về mặc định
  setSelectedWard("");
};

const handleDistrictChange = (event) => {
  const setSelectedDistrictValue = event.target.value;
  setSelectedDistrict(event.target.value);
  const data = districts
  
  const foundData = data.find(item => item.code === parseInt(setSelectedDistrictValue));
  const cityname = foundData ? foundData.name : "Not found";
  localStorage.setItem('selectedDistrict', cityname);
  setSelectedWard("");
};
const handleWardChange = (event) => {
  const setSelectedWardtValue = event.target.value;
  setSelectedWard(event.target.value);
  const data = wards
  
  const foundData = data.find(item => item.code === parseInt(setSelectedWardtValue));
  const cityname = foundData ? foundData.name : "Not found";
  localStorage.setItem('selectedWards', cityname);
 
};
 
  if(paidFor){
   
  }
  if(error){
    alert(error)
  }
  const handleCloseBR = () => {
    setOpenBR(false);
  };
  const handleOpenBR = () => {
    setOpenBR(true);
  };
  let navigate=useNavigate();
  const handleClickOpenf = () => {
    setOpenf(true);
  };

  const handleClosef = () => {
    setOpenf(false);

  };
  const handlesavef = () => {
    localStorage.removeItem("cartItems")
        setCartItems([]);
        setCartItemCount(prevCount => prevCount - prevCount);
    navigate("/")
    
  };
  
 
  const [userForm, setUserForm] = React.useState({
    userID: localStorage.getItem("id"),
    address: "",
    status: "1",
    price: "",
    phone:""
   
  });
  const handleNameChange = (event) => {
    setName(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      name: event.target.value
    }));
    localStorage.setItem("name", event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      phone: event.target.value
    }));
    localStorage.setItem("phone", event.target.value);
  };
  
  const handleDerectionChange = (event) => {
    setDerection(event.target.value);
   
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      address:localStorage.getItem("selectedCity")+" / " +localStorage.getItem("selectedDistrict")+" / " +localStorage.getItem("selectedWards")+" / " + event.target.value
    }));
    localStorage.setItem("address", event.target.value);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedAddress = localStorage.getItem("address");
    const storedPhone = localStorage.getItem("phone");
    const storedTotal = localStorage.getItem("total");
  
    setUserForm((prevState) => ({
      ...prevState,
      name: storedName,
      address:localStorage.getItem("selectedCity")+" / " +localStorage.getItem("selectedDistrict")+" / " +localStorage.getItem("selectedWards")+" / " + storedAddress,
      
      phone :storedPhone,
      price:localStorage.getItem("total")
    
      
    }));
  }, []);
  
  
  
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { cartItems } = props;
  const test = () => {
    alert(localStorage.getItem('cartItems'))
  }

  const handleRemoveCartItem = item => {
    onRemoveCartItem(item);
    setUserForm(prevState => ({
      ...prevState,
      price:localStorage.getItem("total"),
    }));
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
  const [orderNew, setOrderNew] = React.useState();

  const saveCart = () => {
    handleOpenBR()
    if ( !localStorage.getItem("address")) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      setOpenBR(false)
      return;
    }
    if ( !localStorage.getItem("token")) {
      alert("Please Login !");
      setOpenBR(false)
      return;
    }
    if ( localStorage.getItem("cartItems")==="[]") {
      alert("Please add to cart !");
      setOpenBR(false)
      return;
    }
    
    setUserForm(prevState => ({
      ...prevState,
      address:localStorage.getItem("selectedCity")+" / " +localStorage.getItem("selectedDistrict")+" / " +localStorage.getItem("selectedWards")+" / " +localStorage.getItem("address"),
      phone:localStorage.getItem("phone"),
      price:localStorage.getItem("total")
    }));
    axios.post("https://shop-shoe-1-heb5.onrender.com/api/v1/auth/save", {cart: userForm, listProduct: cartItems})
      .then((response) => {
        console.log(response.data);
        alert("Đã lưu giỏ hàng thành công!");
        handleClickOpenf();
        
      })
      .catch((error) => {
        console.log(error);
        alert("Lưu giỏ hàng thất bại!");
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
    setUserForm(prevState => ({
      ...prevState,
      price:localStorage.getItem("total"),
    }));
  };
  const handleApprove=(orderID)=>{

    setPaidFor(true)
  

  }
  const initialOptions = {
    "client-id": "AWCcjCYC4hYJEDfetxTmTmA0G6bedlD582VsPaUC13pPFPWWKPoWR_xedN3unAHOPfGb2cjNOysE48eb",
    currency: "USD",
    intent: "capture",
  };
  const handleGoogleSignInSuccess = (response) => {
    const idToken = response.tokenId;
   
    localStorage.setItem('tset123',JSON.stringify(response.tokenId));
    
  };

  const handleGoogleSignInFailure = (error) => {
    console.error('Google Sign-In failed:', error);
  };
  return (
    <div>

    <PayPalScriptProvider options={initialOptions}>
    <Header cartItemCount={cartItemCount} />
    <MegaMenu></MegaMenu>
    <Dialog
    fullScreen
    open={openf}
    onClose={handleClosef}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClosef}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          Sound
        </Typography>
        <Button autoFocus color="inherit" onClick={handlesavef}>
          Authen
        </Button>
      </Toolbar>
    </AppBar>
    <div className='center_c'>
    <List>
      <h1  className='h1c'>Order</h1>
      <div >
      <h2 className='h2c'>Customer Information</h2>
      <ListItem button>
        <ListItemText primary={name} secondary="Name" />
      </ListItem>
      <ListItem button>
      <ListItemText primary={userForm.address} secondary="Address" />
    </ListItem>
    <ListItem button>
        <ListItemText primary={phone} secondary="Phone" />
      </ListItem>
      <ListItem button>
      <ListItemText primary={derection} secondary="Derection" />
    </ListItem>
      <ListItem button>
      <ListItemText primary={getTotalPrice} secondary="Total Price" />
    </ListItem>
   <h2 className='h2c'>Product information</h2>
    <ListItem>
    
    {cartItems.map(item => (
      <div class="cart-item" id="item">
        <img src={"https://raw.githubusercontent.com/duyancol/shop-shoe/master/src/main/resources/static/images/img/"+item.img} alt="" />
        <p>{item.name}</p>
        <p>${item.price}</p>
        <input
        type="number"
        min="1"
        value={item.quantity}
       
      />
        
      </div>
      
      ))}
      </ListItem>
      </div>
      
      
      
      <Divider />
      <ListItem button>
        <ListItemText
          primary="Default notification ringtone"
          secondary="Tethys"
        />
      </ListItem>
    </List>
    </div>
  </Dialog>
  
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Oder</DialogTitle>
      <DialogContent>
     
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBR}
    onClick={handleCloseBR}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
      <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Name"
      type="text"
      fullWidth
      variant="standard"
      value={name} onChange={handleNameChange}
    /> 
    <div className='choose_select'>
    <h1>Choose Address </h1>
    <select value={selectedCity} onChange={handleCityChange}>
      <option value="">Chọn tỉnh thành</option>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </select>
    <br />

    <div className='choose'>
    <select value={selectedDistrict} onChange={handleDistrictChange}>
      <option value="">Chọn quận huyện</option>
      {districts.map((district) => (
        <option key={district.code} value={district.code}>
          {district.name}
        </option>
      ))}
    </select>
    <br />

    <select value={selectedWard} onChange={handleWardChange} >
      <option value="">Chọn phường xã</option>
      {wards.map((ward) => (
        <option key={ward.code} value={ward.code}>
          {ward.name}
        </option>
      ))}
    </select>
    </div>

    
  </div>
    <TextField
      autoFocus
      margin="dense"
      id="address"
      label="Adress"
      type="text"
      fullWidth
      variant="standard"
      value={address} onChange={handleAddressChange}
    /> 
    <TextField
      autoFocus
      margin="dense"
      id="phone"
      label="Phone"
      type="text"
      fullWidth
      variant="standard"
      value={phone} onChange={handlePhoneChange}
    /> 
    <label>Derection</label><br></br>

    <TextArea
    autoFocus
    margin="dense"
    id="derection"
    label="Phone"
    type="text"
    fullWidth
    variant="standard"
    value={derection} onChange={handleDerectionChange}
  /> 
    
      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveCart}>Order COD</Button>
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
              description:"c.description",
              amount :{
                value:getTotalPrice
              }
            }]
          })
        }}
        onApprove={async(data,actions)=>{
          const order =await actions.order.capture();
          console.log("order",order)
          saveCart()
          handleApprove(data.orderID);
        }}
        onCancel={()=>{

        }}
        onError={(err)=>{
          setError(err)
          console.error("PayPal Checkout Error")

        }}
        ></PayPalButtons>
      </DialogActions>
    </Dialog>
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
            <img src={"https://raw.githubusercontent.com/duyancol/shop-shoe/master/src/main/resources/static/images/img/"+item.img} alt="" />
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
          <h3 className='h3'>Totals &nbsp; &nbsp; ${getTotalPrice}</h3>
          <div class="buttons">
            <a class="button-checkout" onClick={() =>handleClickOpen()}>Checkout</a>
            <a class="cancel" href="/">Continue Shopping</a>
          </div>
        </div>
      </div>
    <Footer></Footer>
    </PayPalScriptProvider>
    </div>
  );
}

export default Cart;