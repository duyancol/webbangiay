
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
    status: "0",
    price: getTotalPrice,
    phone:""
   
  });
  const handleNameChange = (event) => {
    setName(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      name: event.target.value
    }));
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      phone: event.target.value
    }));
  };
  const handleDerectionChange = (event) => {
    setDerection(event.target.value);
   
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setUserForm(prevState => ({
      ...prevState,
      address: event.target.value
    }));
  };

  
  
  
 

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
    if (!userID || !address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setUserForm(prevState => ({
      ...prevState,
      
      address
    }));
    axios.post("http://localhost:8080/api/v1/auth/save", {cart: userForm, listProduct: cartItems})
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
  };
  return (
    <div>
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
        <img src={"../"+item.img} alt="" />
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
        <Button onClick={saveCart}>Subscribe</Button>
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
          <h3 className='h3'>Totals &nbsp; &nbsp; ${getTotalPrice}</h3>
          <div class="buttons">
            <a class="button-checkout" onClick={() =>handleClickOpen()}>Checkout</a>
            <a class="cancel" href="/">Continue Shopping</a>
          </div>
        </div>
      </div>
    <Footer></Footer>
    
    </div>
  );
}

export default Cart;