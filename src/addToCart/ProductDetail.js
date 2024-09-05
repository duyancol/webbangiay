

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/info.css';
import '../css/preloader.css';
import { Helmet } from 'react-helmet';
import videoFile from '../images/videoplayback.mp4';
import gifFile from '../images/nike-zoom.gif';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MegaMenu from '../layout/MegaMenu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FacebookComments from '../page/FacebookComments';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function ProductDetail({onAddToCart,cartItemCount,open,handleClose,Alert,handleClick}) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [value, setValue] = React.useState(0);
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD= () => {
    setOpenD(false);
  };
  
  useEffect(() => {
    // fetch(`http://localhost:8080/api/v1/auth/getProduct/${id}`)
    //   .then(res => res.json())
    //   .then(data => setProduct(data))
      
    //   .catch(err => console.error(err));
   
    loaddata();
    loadCheckreport();
    
  
  }, [id]);
 
  const loaddata =()=>{
    axios.get(`https://shop-shoe-1-heb5.onrender.com/api/v1/auth/getProduct/${id}`)
    .then((response) => {
      setProduct(response.data);
      localStorage.setItem('start',JSON.stringify(response.data.reportStart));
    })
    .catch((error) => {
      console.log(error);
    });
    

      const loader = document.querySelector(".se-pre-con");
    loader.style.opacity = 1;
    setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.display = 'none';
    }, 1000);
  }

  const loadCheckreport =()=>{
    const iduser = localStorage.getItem("id");
    axios.get(`http://localhost:8080/api/v1/auth/getReport/${id}/${iduser}`)
    .then((response) => {
     
      localStorage.setItem('checkReport',JSON.stringify(response.data));
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  }
  // useEffect(() => {
  //   // Gọi lại mã nhúng sau mỗi lần component được ghi lại (re-render)
  //   window.FB.XFBML.parse();
  // });
//   setUserForm(prevState => ({
//     ...prevState,
//     userID:"2",
//     productID:product.id,
//     report:value
//   }));
//   axios.post(`http://localhost:8080/api/v1/auth/addReportStar/${product.id}`, {cart: userForm, listProduct: cartItems})
//     .then((response) => {
//       console.log(response.data);
//       alert("Đã lưu giỏ hàng thành công!");
//       handleClickOpenf();
      
//     })
//     .catch((error) => {
//       console.log(error);
//       alert("Lưu giỏ hàng thất bại!");
//     });
// };
const onSupmit= async(e)=>{
  
       const formData = new FormData();
       formData.append('userID', localStorage.getItem("id"));
       formData.append('report', value);
       
       const config = {
         headers: {
           'content-type': `multipart/form-data; boundary=${formData._boundary}`,
         }
       }
       e.preventDefault();
       await axios.post(`http://localhost:8080/api/v1/auth/addReportStar/${product.id}`,formData,config)
     
       loaddata();
       handleClickOpenD()
      
       
      
     }
     
  return (
    <div >
    <Header cartItemCount={cartItemCount} />
    <div>
     
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Thank you for rating the product !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD}>Disagree</Button>
          <Button onClick={handleCloseD} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <Stack spacing={2} sx={{ width: '100%' }}>

    
    
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Add to cart success !
      </Alert>
    </Snackbar>
    
  </Stack>
     <MegaMenu></MegaMenu>
    <Helmet>
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
    rel="stylesheet"
  />
  <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    />
</Helmet>
   
    <div className="se-pre-con"></div>
  
    
      <div className="row1">
        <div className="col1">
          <img src={"https://raw.githubusercontent.com/duyancol/shop-shoe/master/src/main/resources/static/images/img/"+product.img} alt="" srcset="" />

        </div>
        <div className="col2">
          <h1 className='name-product'>{product.name}</h1>
         
          <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
         
          <Rating
            name="simple-controlled"
            value={parseInt(product.reportStart)}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
         
        </Box>
                    
                 
                 

        <p>{localStorage.getItem("start")}</p>
        
          <p>
            The iconic Nike Free returns with more perforations and engineered
            mesh in the upper that strategically target breathability across
            high-heat areas. A slimmer heel collar and tongue reduce bulk
            without compromising comfort, while exposed Flywire cables give you
            a snug fit at higher speeds.
          </p>
          <h2>${product.price}</h2>
          <span>
            <h2>Size</h2>
            
          </span>
          <select id="status" name="status"  >
       
        
            <option value="wait-accept">38</option>
            <option value="accept">39</option>
            <option value="shipping">40</option>
            <option value="delivered">41</option>
            <option value="error">42</option>
            <option value="error">43</option>
            <option value="error">44</option>
            <option value="error">45</option>
          </select>
          <br />
          <br />
          <h2>Remaining {product.quantity} product</h2>
          {product.quantity>0 ? ( 
            
            <a className="button-cart" onClick={() => onAddToCart(product)}>Add to cart</a> 
           
               ):<img className='het_hang' src={"http://localhost:8080/images/img/sold-removebg-preview (1).png"} ></img>}
               &nbsp;&nbsp;
          
          <Link className="wishlist" to="/">Add to wishlist</Link>
          
          {localStorage.getItem("checkReport")==="false" ? ( <div>   
            <h2>Can you give us a product review?</h2>       
            <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
           
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          
          </Box>
          <div className='none'></div>
          <form class="contact100-form validate-form" onSubmit={(e)=>onSupmit(e)}>
          <button type='submit' class="contact100-form-btn">Evaluate</button>
          </form>
           </div> ): <>
           <h2>Products you have reviewed before </h2>
            <Box
          sx={{
            '& > legend': { mt: 2 },
          }}
        >
         
          <Rating
            name="simple-controlled"
            value={parseInt(product.reportStart)}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        
        </Box>
        
          </> }
          <FacebookComments></FacebookComments>
        </div>
        
      </div>
      
   
      <h1 className='h1'>Video</h1>
      <video
      src={videoFile}
      type="video/mp4"
      controls
      controlsList="nodownload"
      poster={gifFile}
    />
   
    
    <Footer></Footer>
    </div>
   
  );
}

export default ProductDetail;