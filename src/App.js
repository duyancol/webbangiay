import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';



import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Demo from './Demo';
import AddProduct from './product/AddProduct';
import EditProduct  from './product/EditProduct';
import ViewProduct from './product/ViewProduct';
import Header from './layout/Header';
import Slideer from './layout/Slideer';
import Footer from './layout/Footer';
import Product from './layout/Product';

import Search from './layout/Search';
function App() {
  return (
    <div className="App">
    
  
      <Router>
    
        <Header/>   
        <Navbar/>
        <Slideer/>
        <Product/>
        <Footer/>
        
       
      
      </Router>

      
    </div>
  );
}

export default App;



