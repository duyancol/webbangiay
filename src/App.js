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
import MegaMenu from './layout/MegaMenu';
import Search from './layout/Search';
import Home from './page/Home';
import Login from './page/Login';
function App() {
  return (
    <div className="App">
       
       
  
      <Router>
        <Routes>
          <Route>
          <Route exact path='/' element={<Home/> }> </Route>
          <Route exact path='/login' element={<Login/>}> </Route>
          <Route exact path='/addProduct' element={<AddProduct/>}></Route>
          <Route exact path='/getProduct/:id' element={<ViewProduct/>}></Route>
          <Route exact path='/editProduct/:id' element={<EditProduct/>}></Route>
          </Route>
        </Routes>
      </Router>
     
      
    </div>
  );
}

export default App;



