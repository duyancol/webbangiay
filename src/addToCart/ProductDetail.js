

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
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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

  return (
    <div >
    <Header />
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
          <img src={"../"+product.img} alt="" srcset="" />

        </div>
        <div className="col2">
          <h1 className='name-product'>{product.name}</h1>
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
          <a className="button-cart" onClick={() => props.onAddToCart(product)}>Add to cart</a> &nbsp;
          &nbsp;
          <Link className="wishlist" to="/">Add to wishlist</Link>
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