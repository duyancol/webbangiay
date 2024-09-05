import React from 'react'
import ForgotPassWord from '../page/ForgotPassWord'
import OrderHistory from '../page/OrderHistory'
import FeedBack from './FeedBack'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Profile() {
    
    const name=localStorage.getItem("nameuser");
    const email_tk=localStorage.getItem("email_tk");
    const [cities, setCities] = React.useState([]);
    const [selectedCity, setSelectedCity] = React.useState("");
    const [districts, setDistricts] = React.useState([]);
    const [selectedDistrict, setSelectedDistrict] = React.useState("");
    const [wards, setWards] = React.useState([]);
    const [selectedWard, setSelectedWard] = React.useState("");
     const [chooseaddress, setChooseaddress] = React.useState("");

     const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

     const [openBR, setOpenBR] = React.useState(false);
     const handleCloseBR = () => {
       setOpenBR(false);
     };
     const handleOpenBR = () => {
       setOpenBR(true);
     };
    React.useEffect(() => {
      axios.get("http://localhost:3003/api").then((response) => {
        setCities(response.data);
        localStorage.setItem('City',JSON.stringify(response.data));
        console.log()
      });
    }, []);
    
    React.useEffect(() => {
      const fetchDistricts = async () => {
        if (selectedCity !== "") {
          try {
            const response = await axios.get(
              `http://localhost:3003/open-api?selectedCity=${selectedCity}`
            );
            setDistricts(response.data.districts);
          } catch (error) {
            console.error("Lỗi:", error);
          }
        } else {
          setDistricts([]);
          setWards([]);
        }
      };
    
      fetchDistricts();
    }, [selectedCity]);
    
    React.useEffect(() => {
      const fetchWards = async () => {
        if (selectedDistrict !== "") {
          try {
            const response = await axios.get(
              `http://localhost:3003/open-api-se?selectedDistrict=${selectedDistrict}`
             
            );
         
            setWards(response.data.wards);
          } catch (error) {
            console.error("Lỗi:", error);
          }
        } else {
          setWards([]);
        }
      };
    
      fetchWards();
    }, [selectedDistrict]);
    
    
    const handleCityChange = (event) => {
      const selectedCityValue = event.target.value;
      setSelectedCity(selectedCityValue);
      const liscity=localStorage.getItem("City");
      const data = cities
      
      const foundData = data.find(item => item.code === parseInt(selectedCityValue));
      const cityname = foundData ? foundData.name : "Not found";
      localStorage.setItem('selectedCity', cityname);
      setSelectedDistrict(""); // Đặt giá trị của selectedDistrict về mặc định
      setSelectedWard("");
    };
    
    const handleDistrictChange = (event) => {
      const setSelectedDistrictValue = event.target.value;
      setSelectedDistrict(event.target.value);
      const data = districts
      
      const foundData = data.find(item => item.code === parseInt(setSelectedDistrictValue));
      const cityname = foundData ? foundData.name : "Not found";
      localStorage.setItem('selectedDistrict', cityname);
      setSelectedWard("");
    };
    const handleWardChange = (event) => {
      const setSelectedWardtValue = event.target.value;
      setSelectedWard(event.target.value);
      const data = wards
      
      const foundData = data.find(item => item.code === parseInt(setSelectedWardtValue));
      const cityname = foundData ? foundData.name : "Not found";
      localStorage.setItem('selectedWards', cityname);
     
    };
    const[user,setUser]=React.useState({
        firstname : "",
        lastname : "",
        phone : "",
        address : ""
      });
      const{firstname,lastname,phone,address}=user
      const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    
      }
     
    
    React.useEffect(() => {

        setChooseaddress(localStorage.getItem("selectedCity")+" / " +localStorage.getItem("selectedDistrict")+" / " +localStorage.getItem("selectedWards")+" / ")

        loaddata(); 

      },[]);
      React.useEffect(() => {

        setChooseaddress(localStorage.getItem("selectedCity")+" / " +localStorage.getItem("selectedDistrict")+" / " +localStorage.getItem("selectedWards")+" / ")

         

      });
      const loaddata =()=>{
        axios.get(`http://localhost:8080/api/v1/auth/users/getByEmail?email=${email_tk}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        
    
    
      }

const onSupmit= async(e)=>{
  setOpenBR(true)
    const formData = new FormData();
    formData.append('email', email_tk);
    formData.append('firstName', user.firstname);
    formData.append('lastName', user.lastname);
    formData.append('chooseaddress', chooseaddress);
    formData.append('phone', user.phone);
    formData.append('address',user.address);
   
 
    const config = {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    }
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/auth/users/updateUserSetting`,formData,config)
    setOpenBR(false)
    setOpen(true)
    loaddata()

    
   
   
  }
  return (
    <div>
    <section class="py-5 my-5">
    <div class="container">
        <h1 class="mb-5">Account Settings</h1>
        <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
                <div class="p-4">
                    <div class="img-circle text-center mb-3">
                        <img src="../images/user2.jpg" alt="Image" class="shadow"/>
                    </div>
                    <h4 class="text-center">Hello : {name}</h4>
                </div>
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                        <i class="fa fa-home text-center mr-1"></i> 
                        Account
                    </a>
                    <a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Password
                    </a>
                    <a class="nav-link" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
                        <i class="fa fa-user text-center mr-1"></i> 
                        Order History
                    </a>
                    <a class="nav-link" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false">
                        <i class="fa fa-tv text-center mr-1"></i> 
                        Feed Back
                    </a>
                    <a class="nav-link" id="notification-tab" data-toggle="pill" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Notification
                    </a>
                </div>
            </div>
            <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
           
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openBR}
              onClick={handleCloseBR}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
                <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                   <form onSubmit={(e)=>onSupmit(e)}>
                   
                   <h3 class="mb-4">Account Settings</h3>
                   <div class="row">
                       <div class="col-md-6">
                       <label>First Name</label>
                           <div class="form-group">
                                
                                 <input type="text" name='firstname' class="form-control"  value={firstname} onChange={(e)=>onInputChange(e)}/>
                           </div>
                       </div>
                       <div class="col-md-6">
                       <label>Last Name</label>
                           <div class="form-group">
                                
                                 <input type="text" name='lastname' class="form-control"  value={lastname} onChange={(e)=>onInputChange(e)}/>
                           </div>
                       </div>
                       <div class="col-md-6">
                           <div class="form-group">
                                 <label>Email</label>
                                 <input type="text" class="form-control"  value={email_tk}/>
                           </div>
                       </div>
                       <div class="col-md-6">
                       <label>Phone number</label>
                           <div class="form-group">
                                 
                                 <input type="text" name='phone' class="form-control" value={phone} onChange={(e)=>onInputChange(e)} />
                           </div>
                       </div>
                       <div class="col-md-6">
                       <label>Role</label>
                           <div class="form-group">
                                 
                                 <input type="text" class="form-control" value="USER"/>
                           </div>
                       </div>
                       <div class="col-md-6">
                       <label>Choose Address</label>
                       <div class="form-group">
                                 
                       </div>
                       <div className='choose_select'>
                       
                       <select value={selectedCity} onChange={handleCityChange}>
                         <option value="">Chọn tỉnh thành</option>
                         {cities.map((city) => (
                           <option key={city.code} value={city.code}>
                             {city.name}
                           </option>
                         ))}
                       </select>
                       <br />
                   
                       <div className='choose'>
                       <select value={selectedDistrict} onChange={handleDistrictChange}>
                         <option value="">Chọn quận huyện</option>
                         {districts.map((district) => (
                           <option key={district.code} value={district.code}>
                             {district.name}
                           </option>
                         ))}
                       </select>
                       <br />
                   
                       <select value={selectedWard} onChange={handleWardChange} >
                         <option value="">Chọn phường xã</option>
                         {wards.map((ward) => (
                           <option key={ward.code} value={ward.code}>
                             {ward.name}
                           </option>
                         ))}
                       </select>
                       </div>
                        </div>
                        <span>{chooseaddress}</span>
                      
                       </div>
                       <div class="col-md-12">
                       <label>Address</label>
                           <div class="form-group">
                                
                               <textarea name='address' class="form-control" rows="4" value={address} onChange={(e)=>onInputChange(e)}></textarea>
                           </div>
                       </div>
                   </div>
                   <div>
                       <button  class="btn btn-primary">Update</button>
                       <button class="btn btn-light">Cancel</button>
                   </div>
                   </form>
                </div>
                <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                    <h3 class="mb-4">Password Settings</h3>
                   <ForgotPassWord></ForgotPassWord>
                </div>
                <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    <h3 class="mb-4">Oder views</h3>
                    <OrderHistory></OrderHistory>
                </div>
                <div class="tab-pane fade" id="application" role="tabpanel" aria-labelledby="application-tab">
                    <h3 class="mb-4">Contact </h3>
                    <FeedBack></FeedBack>
                   
                </div>
                <div class="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab">
                    <h3 class="mb-4">Notification Settings</h3>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification1"/>
                            <label class="form-check-label" for="notification1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification2" />
                            <label class="form-check-label" for="notification2">
                                hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification3" />
                            <label class="form-check-label" for="notification3">
                                commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                            </label>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-primary">Update</button>
                        <button class="btn btn-light">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Stack spacing={2} sx={{ width: '100%' }}>
    
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        This is a success message!
      </Alert>
    </Snackbar>
  </Stack>
</section>

    </div>
  )
}
