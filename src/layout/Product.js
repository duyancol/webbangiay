import React,{ useState ,useEffect} from 'react'

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';

export default function Product() {
  const [loading, setLoading] = React.useState(false);
const [query, setQuery] = React.useState('idle');
const timerRef = React.useRef();
const addCart=()=>{
  fetch(`http://localhost:8080/api/v1/auth/addCart?id=3`)
  .then(res => res.json())
  .then(
    (result) => {
     console.log(result)
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      // setIsLoaded(true);
      // setError(error);
    }
  )}
React.useEffect(
  () => () => {
    clearTimeout(timerRef.current);
  },
  [],
);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const handleClickLoading = () => {
      setLoading((prevLoading) => !prevLoading);
    };
    
    const handleClickQuery = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clickCart1()
      }
    
      if (query !== 'idle') {
        setQuery('idle');
        return;
      }
    
      setQuery('progress');
      timerRef.current = window.setTimeout(() => {
        setQuery('success');
      }, 2000);
    };
    const handleClickQuery1 = (id) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        clickCart2(id)
      }
    
      if (query !== 'idle') {
        setQuery('idle');
        return;
      }
    
      setQuery('progress');
      timerRef.current = window.setTimeout(() => {
        setQuery('success');
      }, 2000);
    };
    // const {count}=useParams();
    const count =document.getElementsByClassName("count").length +3;
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const baseURL = "http://localhost:8080/api/v1/auth/get3ProductNew";
    const [rows, setRows] = useState([]);
    const [rowdata, setRowdata] = useState([]);
  
    useEffect(() => {
      axios.get(baseURL).then((response) => {
        setRows(response.data);
      });
    }, []);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
      
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    
    };
  
    useEffect(() => {
      if (rowdata) {
        setRows([rowdata]);
      } else {
        axios.get(baseURL).then((response) => {
          setRows(response.data);
          console.log(response.data);
        });
      }
    }, [rowdata]);
  
  
    useEffect(() => {
      fetch("http://localhost:8080/api/v1/auth/get3ProductNew")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
    const clickCart1=()=>{
      fetch(`http://localhost:8080/api/v1/auth/getNext3Product/${count}/0`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRows(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )}
      const clickCart2=(id)=>{
        fetch(`http://localhost:8080/api/v1/auth/addCart?id=1`,{
          method: "POST"
        })
        
        
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )}
        
  return (
    
    <div>
   
    <div className='search'>
    <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={rows}
    onChange={(e, v) => setRowdata(v)}
    sx={{ width: 700 }}
    getOptionLabel={(rows) => rows.name || ""}
    renderInput={(params) => (
      <TextField {...params} label="Search Movie" size="small" />
    )}
  />
  </div>
    <div className="wrap">
    <div className="price-rage">
        <h3>Weekly selection:</h3>
        <div id="slider-range">
        </div>
    </div>
</div>
    <div className="content">
    <div className="wrap">
        <div className="content-left">
                <div className="content-left-top-grid">
                    <div className="content-left-price-selection">
                        <h4>Select Price:</h4>
                        <div className="price-selection-tree">
                        <span className="col_checkbox" >
                                <input id="10" className="css-checkbox10" type="checkbox" />
                                <label  className="normal" ><i for="10" name="demo_lbl_10"  className="css-label10"> </i> 400</label>
                            </span>
                            <span className="col_checkbox" >
                                <input id="11" className="css-checkbox11" type="checkbox"/>
                                <label className="active1" ><i for="11" name="demo_lbl_11"  className="css-label11"> </i>350</label>
                            </span> 
                            <span className="col_checkbox" >
                                <input id="12" className="css-checkbox12" type="checkbox"/>
                                <label className="normal" ><i for="12" name="demo_lbl_12"  className="css-label12"> </i> 300</label>
                            </span>
                            <span className="col_checkbox">
                                <input id="13" className="css-checkbox13" type="checkbox"/>
                                <label className="normal"><i for="13" name="demo_lbl_13"  className="css-label13"> </i>250</label>
                            </span>
                            <span className="col_checkbox">
                                <input id="14" className="css-checkbox14" type="checkbox"/>
                                <label className="normal"><i for="14" name="demo_lbl_14"  className="css-label14"> </i> 200</label>
                            </span>
                            <span className="col_checkbox">
                                <input id="15" className="css-checkbox15" type="checkbox"/>
                                <label className="normal"><i for="15" name="demo_lbl_15"  className="css-label15"> </i>150</label>
                            </span>
                        </div>
                        
                </div>
                </div>
                <div className="content-left-bottom-grid">
                    <h4>Boys Football:</h4>
                    <div className="content-left-bottom-grids">
                        <div className="content-left-bottom-grid1">
                            <img src="images/foot-ball.jpg" title="football" />
                            <h5><a href="details.html">Nike Strike PL Hi-Vis</a></h5>
                            <span> Football</span>
                            <label>&#163; 375</label>
                        </div>
                        <div className="content-left-bottom-grid1">
                            <img src="images/jarse.jpg" title="jarse" />
                            <h5><a href="details.html">Nike Strike PL Hi-Vis</a></h5>
                            <span> Football</span>
                            <label>&#163; 375</label>
                        </div>
                    </div>
                </div>
        </div>
        <div className="content-right">
            <div className="product-grids">
              
                    <script src="js/jstarbox.js"></script>
                    <link rel="stylesheet" href="css/jstarbox.css" type="text/css" media="screen" charset="utf-8" />
                   
                   
                    <>
      {rows ? (
        < >
         
           
          
         
           
            
                
                <div>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <div onclick="location.href='details.html';" className="product-grid count">
                        <Link className='btn btn-primary' to={`/products/${row.id}`}>seen</Link>
                        <div className="product-grid-head">
                            <ul className="grid-social">
                                <li><a className="facebook" href="#"><span> </span></a></li>
                                <li><a className="twitter" href="#"><span> </span></a></li>
                                <li><a className="googlep" href="#"><span> </span></a></li>
                                <div className="clear"> </div>
                            </ul>
                            <div className="block">
                                <div className="starbox small ghosting" > </div> <span> (46)</span>
                            </div>
                        </div>
                        <div className="product-pic">
                            <a href="#"><img src={row.img} title="product-name" /></a>
                            <p>
                            <a href="#"><small>Nike</small> {row.name} FG</a>
                            <span>Mens Firm-Ground Football Boot</span>
                            </p>
                        </div>
                        <div className="product-info">
                            <div className="product-info-cust">
                                <a href="details.html">Details</a>
                            </div>
                            <div className="product-info-price">
                                <a href="details.html">&#163; 380</a>
                            </div>
                            <div className="clear"> </div>
                        </div>
                        <div className="more-product-info">
                            <span> </span>
                        </div>

                        
                    </div>
                         
                       
                      );
                    })}
                   
                </div>
             
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
                   
                
              
            
                <div className="clear"> </div>

                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               
                
                <Box sx={{ height: 40 }}>
                  {query === 'success' ? (
                    <Typography>Success!</Typography>
                  ) : (
                    <Fade
                      in={query === 'progress'}
                      style={{
                        transitionDelay: query === 'progress' ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                    >
                      <CircularProgress />
                    </Fade>
                  )}
                </Box>
                <Button className="save-btn" onClick={handleClickQuery} sx={{ m: 2 }}>
                  {query !== 'idle' ? 'Load more' : 'Load more'}
                </Button>
              </Box>
                
                
            
            </div>
        </div>
        <div className="clear"> </div>
    </div>
</div> 
    </div>
  )
}
