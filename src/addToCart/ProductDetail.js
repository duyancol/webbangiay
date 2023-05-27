

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

function ProductDetail({onAddToCart,cartItemCount,open,handleClose,Alert,handleClick}) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [value, setValue] = React.useState(4);
  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/auth/getProduct/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
      

      const loader = document.querySelector(".se-pre-con");
    loader.style.opacity = 1;
    setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.display = 'none';
    }, 1000);
  }, [id]);
  // useEffect(() => {
  //   // Gọi lại mã nhúng sau mỗi lần component được ghi lại (re-render)
  //   window.FB.XFBML.parse();
  // });
  return (
    <div >
    <Header cartItemCount={cartItemCount} />
    <Stack spacing={2} sx={{ width: '100%' }}>

    
    
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
          <img src={"http://localhost:8080/images/img/"+product.img} alt="" srcset="" />

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
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          
        </Box>
          <p>
            The iconic Nike Free returns with more perforations and engineered
            mesh in the upper that strategically target breathability across
            high-heat areas. A slimmer heel collar and tongue reduce bulk
            without compromising comfort, while exposed Flywire cables give you
            a snug fit at higher speeds.
          </p>
          <h2>${product.price}</h2>
          <span>
            <h3>Size</h3>
            
          </span>
          <br />
          <br />
          <a className="button-cart" onClick={() => onAddToCart(product)}>Add to cart</a> &nbsp;
          &nbsp;
          <Link className="wishlist" to="/">Add to wishlist</Link>
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