import React from 'react'
import Slideer from '../layout/Slideer';
import Header from '../layout/Header';
import Product from '../layout/Product';
import MegaMenu from '../layout/MegaMenu';
import Footer from '../layout/Footer';
import '../css/style.css';
import '../css/test.css';
export default function Home({cartItemCount}) {
  return (
    <>
     <Header cartItemCount={cartItemCount} />
     <MegaMenu></MegaMenu>
     <Slideer></Slideer>
     <Product />
     <Footer></Footer>
    </>
  )
}
