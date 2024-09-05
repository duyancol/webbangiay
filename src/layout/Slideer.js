
import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import Spline from '@splinetool/react-spline';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
const items = [
  { text: "Slide 1", bgImage: "https://img.freepik.com/free-psd/sneakers-sale-landing-page-template_23-2148748544.jpg?t=st=1725520295~exp=1725520895~hmac=e6daa1c353f7ccf04b09b0147400b1d1a12669bae2a11ad76b63119962b38c26" },
  { text: "Slide 2", bgImage: "https://img.freepik.com/free-vector/sport-landing-page-with-photo-geometric-shapes_23-2148271375.jpg?w=1060&t=st=1725522296~exp=1725522896~hmac=99079844e9eda3cb7b2ea613cc71fbc53e4b1726b72a9547d5bd619517fb5535" },
  { text: "Slide 3", bgImage: "https://img.freepik.com/free-psd/sport-sale-banner-template_23-2148707053.jpg?w=740&t=st=1725522450~exp=1725523050~hmac=be7bf90012563d465f6e3ddcc46b8f11c84a34666acd5ca6ae653ea9ee30dd71" },
  { text: "Slide 4", bgImage: "https://img.freepik.com/free-psd/super-sale-black-friday-web-banner-template_120329-1089.jpg?w=740&t=st=1725522564~exp=1725523164~hmac=e457e59515c14a217dc92f05e7cc1d50784af5450e6916d02a8fb281df1ae0e0" },
  { text: "Slide 5", bgImage: "https://img.freepik.com/free-psd/summer-fashion-sale-web-banner-template_120329-1505.jpg?t=st=1725453237~exp=1725453837~hmac=0e504dd58819ab10e2bab80f409f9323a2c9d7f5555de42d63e403e18f980c47" },
  { text: "Slide 6", bgImage: "https://img.freepik.com/free-psd/sneakers-sale-template-banner_23-2148748559.jpg?w=740&t=st=1725522730~exp=1725523330~hmac=7a24e520de92e6852616f007c55333d33ddd81d8e973372fabfd1fab5ec6a144" },
  { text: "Slide 7", bgImage: "https://img.freepik.com/free-psd/landing-page-sneakers-sale-template_23-2148748546.jpg?w=740&t=st=1725522863~exp=1725523463~hmac=b1095f9c600362efe5297dbf9602e0a1580687374503c8f690969d71b6513181" },
  { text: "Slide 8", bgImage: "https://img.freepik.com/free-vector/fashion-sale-landing-page_23-2148589129.jpg?t=st=1725522915~exp=1725523515~hmac=020a3140bf3e138b91e0d9e6b4c66fc3d33d9c7908ee6530f2b9b29f9d191f1f" },
];
export default function Slideer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
    }, 3000); // Thay đổi mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, [items.length]);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const itemStyle = (index) => {
    const isActive = currentIndex === index;
    const angle = (index - currentIndex) * (360 / items.length);
    return {
      transform: `rotateY(${angle}deg) translateZ(500px)`,
     
    };
  };
   const currentBgImage = items[currentIndex].bgImage;
  return (
    <div className="slider-container" style={{ backgroundImage: "url("+currentBgImage+")" }}>
   
    <div className="slider-wrapper" >
      {items.map((item, index) => (
        <div className={`slide product-grid ${currentIndex === index ? 'active' : ''}`}
          style={itemStyle(index)} key={index}  >
          <a href="#"><img className='slide_img' src={(item.bgImage)}title="product-name" /></a>
        </div>
      ))}
    </div>
    <button className="slider-btn prev-btn" onClick={handlePrev}>Prev</button>
    <button className="slider-btn next-btn" onClick={handleNext}>Next</button>
  </div>

  )
}
