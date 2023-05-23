import React,{useEffect, useState} from 'react'
import './db.css';
import { Link, Routes, Route } from 'react-router-dom';
import Home_AD from './Home_AD';

import AddProduct from '../product/AddProduct';
import Demo from './Demo';
import Order_AD from './Order_AD';
import Chart from './Chart';
import User from './User';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FeedBack_AD from './FeedBack_AD';
export default function Dankboad() {
   
const [currentComponent, setCurrentComponent] = useState(<Home_AD />);
const goToHome = () => setCurrentComponent(<Home_AD />);
let navigate=useNavigate();
  const goToProduct = () => setCurrentComponent(<Demo />);
  const goToAddProduct = () => setCurrentComponent(<Demo><AddProduct /></Demo>);
  const goToOrder = () => setCurrentComponent(<Order_AD/>);
  const goToChart = () => setCurrentComponent(<Chart/>);
  const goToUser = () => setCurrentComponent(<User/>);
  const goToChat = () => setCurrentComponent(<FeedBack_AD></FeedBack_AD>);
  const goToQiut = () => {navigate("/")};
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
 // Lấy token từ local storage hoặc từ nguồn khác
const token = localStorage.getItem('token');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');




const handleClick = () => {
    sidebar.classList.toggle('hide');
};

const switchMode = document.getElementById('switch-mode');
const handleClickDark = (e) => {
    
    if(e.target.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
  };


  return (
    <div>
   
    <section id="sidebar">
    <a href="#" class="brand">
        <i class='bx bxs-smile'></i>
        <span class="text">AdminHub</span>
    </a>
    <ul class="side-menu top">
        <li class="active"  onClick={goToHome}>
            <a href="#">
                <i class='bx bxs-dashboard' ></i>
                <span class="text">Dashboard</span>
            </a>
        </li>
        <li onClick={goToProduct}>
            <a href="#">
                <i class='bx bxs-shopping-bag-alt' ></i>
                <span class="text">My Store</span>
            </a>
        </li>
        <li onClick={goToOrder}> 
        <a href="#">
        <i class="fa-brands fa-shopify fa-shake"></i>
            <span class="text">Order</span>
        </a>
    </li>
        <li onClick={goToChart}> 
            <a href="#">
            <i class="fa-sharp fa-solid fa-chart-pie fa-spin"></i>
                <span class="text">Analytics</span>
            </a>
        </li>
        <li  onClick={goToChat}>
            <a href="#">
                <i class='bx bxs-message-dots' ></i>
                <span class="text">Message</span>
            </a>
        </li>
        <li onClick={goToUser}>
            <a href="#">
                <i class='bx bxs-group' ></i>
                <span class="text">Team</span>
            </a>
        </li>
    </ul>
    <ul class="side-menu">
        <li >
            <a href="#">
                <i class='bx bxs-cog' ></i>
                <span class="text">Settings</span>
            </a>
        </li>
        <li onClick={goToQiut}>
            <a href="#" class="logout">
                <i class='bx bxs-log-out-circle' ></i>
                <span class="text">Quit</span>
            </a>
        </li>
    </ul>
</section>





<section id="content">
    
    <nav>
        <i class='bx bx-menu' onClick={handleClick} ></i>
        <a href="#" class="nav-link">Categories</a>
        <form action="#">
            <div class="form-input">
                <input type="search" placeholder="Search..."/>
                <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
            </div>
        </form>
        <input type="checkbox" id="switch-mode" onClick={handleClickDark} hidden/>
        <label for="switch-mode" class="switch-mode"></label>
        <a href="#" class="notification">
            <i class='bx bxs-bell' ></i>
            <span class="num">8</span>
        </a>
        <a href="#" class="profile">
            <img src="img/people.png"/>
        </a>
    </nav>
   
    <div>
   
    {currentComponent}
    
       
   
  </div>

   
   
   
</section>


    </div>
  )
}
