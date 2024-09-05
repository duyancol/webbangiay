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
import Modal from "react-modal";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import gifFile from '../images/voice_listen.gif';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';

import Rating from '@mui/material/Rating';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
export default function Product({input}) {
  const [loading, setLoading] = React.useState(false);
const [query, setQuery] = React.useState('idle');
const timerRef = React.useRef();
const iduser = localStorage.getItem("id");
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
   
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const baseURL = "https://shop-shoe-1-heb5.onrender.com/api/v1/auth/get3ProductNew";
    const [rows, setRows] = useState([]);
    const [rowdata, setRowdata] = useState([]);
  
    useEffect(() => {
  axios.get(baseURL)
    .then((response) => {
      setRows(response.data);
    })
    .catch((error) => {
      console.log(error);
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
      fetch("https://shop-shoe-1-heb5.onrender.com/api/v1/auth/get3ProductNew")
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
      const count =document.getElementsByClassName("count").length +3;
      fetch(`https://shop-shoe-1-heb5.onrender.com/api/v1/auth/getNext3Product/${count}/0`)
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
     
        const [value, setValue] = React.useState(5);
        const [filteredProducts, setFilteredProducts] = useState([]);
        const [priceFilter, setPriceFilter] = useState(50);
        const [checkedItems, setCheckedItems] = useState({});
        useEffect(() => {
          const filtered = rows.filter(
            (p) =>
              p.price >= 10 &&
              p.price <= priceFilter &&
              (checkedItems[p.id] || Object.keys(checkedItems).length === 0)
          );
          setFilteredProducts(filtered);
        }, [priceFilter, rows, checkedItems]);
        const handlePriceChange = (e) => {
          const value = e.target.value;
          setPriceFilter(value);
        };
      
        const handleCheckboxChange = (e) => {
          setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked,
          });
        };
        const [isListening, setListening] = useState(false);
  const [recognitionText, setRecognitionText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputText, setInputText] = useState("12345");
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const results = rows.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) 
    );
    if(document.getElementById("ser")!==""){
      setFilteredProducts(results)
    }
    if(document.getElementById("ser")==="Z"){
      setFilteredProducts(rows)
    }
    
      setSearchResults(rows);
    
  };
  const search = (term) => {
   
    const results = rows.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) 
    );
    if (results.length > 0) {
      speak(`Tìm thấy ${results.length} kết quả`);
    
    } else {
      speak('Không có sản phẩm liên quan ');
    }
    setFilteredProducts(results)
   
  };
  
  const handleSelect = (product) => {
    setSearchTerm(product.name);
     setSearchResults([]);
     search(product.name)
    setIsInputFocused(false);
  };


  const startListening = () => {
    resetTranscript();
    setListening(true);
    setInputText("");
    setRecognitionText("");
    setModalIsOpen(true);
    SpeechRecognition.startListening({ continuous: true, language: 'vi-VN' });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRecognitionEnd = () => {
    setModalIsOpen(false);
    setListening(false);
  };

  useEffect(() => {
    let timeoutId;
    if (isListening && transcript) {
      setRecognitionText(transcript);
      timeoutId = setTimeout(() => {
        SpeechRecognition.stopListening();
        stopListeningAndCloseModal();
        setSearchTerm(recognitionText)
        search(recognitionText)
        setListening(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript, isListening]);
  const stopListeningAndCloseModal = () => {
    SpeechRecognition.stopListening();
    setListening(false);
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (transcript) {
      setRecognitionText(transcript);
      setInputText(transcript);
    }
  }, [transcript]);
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const inputProps = {
    step: 300,
  };
  const handleKeyDown = (event) => {
    if (event.target.value === '') {
      setSearchResults(rows);
    }
  };
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };
  return (
    
    <div>
    
    <div className="container">
    

    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Listening Modal"
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      content: {
        width: '400px',
        height: '270px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }}
  >
    <div><img className='gif' src={gifFile}  alt="Gif" /></div>
    
    <p>{recognitionText}</p>
  </Modal>
  

    
  </div>
 
  
    <div className="wrap">
    <div className="price-rage">
        <h3>Weekly selection:</h3>
        <div className='search'>
       
        <div>
        <div className="mid-header" >
       
    <div className="wrap" >
   
        <div className="mid-grid-left logo mid-grid-left1"  >
      
          
          <input
        id='ser'
          type="text"
          value={searchTerm}
          onChange={handleSearch}
         
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="       Search for a product"
        />
        {searchResults.length > 0 && (
          <div className="search-results-container">
            <ul className="search-results-list">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
       
        <button className='btn btn-primary btn_voice' onClick={startListening}><i class="fa-solid fa-microphone"></i></button>
        </div></div>
      </div>
       
    
       
     
       
      </div>
      </div>
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
                        <input
                        type="range"
                        min="10"
                        max="50"
                        value={priceFilter}
                        onChange={handlePriceChange}
                      />
                      <p>Filter products with price from $10 to ${priceFilter}</p><br></br>
                        <div className="price-selection-tree">
                        
                            
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
         
           
          
         
           
            
                
                <div  className="product-grid-center">
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <div onclick="location.href='details.html';" className="product-grid  display count">
                        {row.quantity>0 ? ( 
                           <></>
                         
                             ):<div className="product-grid1"> <img src={"https://shop-shoe-1-heb5.onrender.com/images/img/sold-removebg-preview (1).png"} ></img></div>}
                       
                        <Link className='btn ' to={`/products/${row.id}`}><img src='../images/eye.png'></img></Link>
                        <div className="product-grid-head">
                        
                        <Box
                        sx={{
                          '& > legend': { mt: 2 },
                        }}
                      >
                       
                        <Rating
                          name="simple-controlled"
                          value={row.reportStart}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                      
                      </Box>
                     
                           
                        </div>
                        <div className="product-pic">
                            <a href="#"><img src={"https://raw.githubusercontent.com/duyancol/shop-shoe/master/src/main/resources/static/images/img/"+row.img} title="product-name" /></a>
                            <p>
                            <a href="#"><small></small> {row.name} </a>
                            <span>Mens Firm-Ground Football Boot</span>
                            </p>
                        </div>
                        <div className="product-info">
                            <div className="product-info-cust">
                            <Link className='btn ' to={`/products/${row.id}`}>Details</Link>
                            </div>
                            <div className="product-info-price">
                                <a href="details.html">&#163; {row.price}</a>
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
<div className='btn-list-oder'>
   
<Link className='btn btn-primary shopping s t' to={`/order/${iduser}`}><img src='../images/clock.png'></img></Link><br></br>

<Link className='btn btn-primary shopping s t' to={`/getProFile`}><img src='../images/user.png'></img></Link>
</div>
    </div>
  )
}
