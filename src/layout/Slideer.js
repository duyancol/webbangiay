
import React, { useRef, useState } from 'react';
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
export default function Slideer() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
  return (
    <div> 
    <Swiper 
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 9600,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    onAutoplayTimeLeft={onAutoplayTimeLeft}
    className="mySwiper"
  >
  <SwiperSlide className='SwiperSlide'>
  
  <div class="wrap">
 
			<ul id="jquery-demo">
      <li>
      <a href="#slide1">
        <img src="images/tải xuống.png" alt="" class="app-logo" />
      </a>
      <div class="slider-detils">
        <h3  className='h312'>MENS FOOT BALL <label  className='h312'>BOOTS</label></h3>
        <span className='h3121'>Stay true to your team all day, every day, game day.</span>
        <a class="slide-btn" href="details.html"> Shop Now</a>
      </div>
    </li>
        </ul>
        </div>
    
  </SwiperSlide>
  <SwiperSlide className='SwiperSlide'>
 
  
  <div class="wrap" >
 
			<ul id="jquery-demo">
      <li>
      <a href="#slide2">
        <img src="images/slider_4.png"  alt="" class="app-logo" />
      </a>
      <div class="slider-detils">
        <h3  className='h312'>MENS FOOT BALL <label  className='h312'>BOOTS</label></h3>
        <span className='h3121'>Stay true to your team all day, every day, game day.</span>
        <a class="slide-btn" href="details.html"> Shop Now</a>
      </div>
    </li>
        </ul>
        </div>
</SwiperSlide>
    <SwiperSlide className='SwiperSlide'>
    

   
    <div class="wrap">
				
			<ul id="jquery-demo">
      <li>
      <a href="#slide3">
        <img src="images/tải xuống.png" alt="" class="app-logo" />
      </a>
      <div class="slider-detils">
        <h3 className='h312'>MENS FOOT BALL <label  className='h312'>BOOTS</label></h3>
        <span className='h3121'>Stay true to your team all day, every day, game day.</span>
        <a class="slide-btn" href="details.html"> Shop Now</a>
      </div>
    </li>
        </ul>
        </div>
    </SwiperSlide>
   
    
    <div className="autoplay-progress" slot="container-end">
      <svg viewBox="0 0 48 48" ref={progressCircle}>
       
      </svg>
      <span ref={progressContent}></span>
    </div>
  </Swiper>
    </div>
  )
}
