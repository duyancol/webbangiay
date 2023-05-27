
import React,{useEffect, useState} from 'react'
import axios from "axios"

import { useNavigate, useParams } from 'react-router-dom';
export default function EditProduct(props) {
  let navigate=useNavigate();
 
  const[user,setUser]=useState({
    name:"",
    price: 0,
    quantity: 0,
    img : "",
    category: "",
    derectory: ""

  });
  const{name,price,quantity,img,category,derectory}=user
  const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});

  }
  useEffect(()=>{
    loadUser()
    
    
      // Nếu tồn tại dữ liệu hình ảnh, ta sử dụng URL.createObjectURL để tạo URL tạm thời
      
     
   
  },[])
  const onSupmit= async(e,id)=>{
    props.handOpenBR()
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('price', user.price);
    formData.append('quantity', user.quantity);
   
    formData.append('img', user.img);
    formData.append('category', user.category);
    formData.append('derectory', user.derectory);
 
    const config = {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
      }
    }
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/auth/editProduct/${id}`,formData,config)
    
    props.handleCloseED()
    props.handleAddProduct()
    props.handleCloseBR()
   
  }
  const [imageSrc, setImageSrc] = useState("");
  const loadUser =async()=>{
   
    setUser(props.product)
    setImageSrc("http://localhost:8080/images/img/"+props.product.img);
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setUser(prevState => ({
        ...prevState,
        img: file // cập nhật 'formData.image' với tệp được chọn
      }));
    };
    reader.readAsDataURL(file);
    setUser({
      ...user,
      img: e.target.files[0]
    });
  }
  const onInputChangeIntPrice = (e) => {
    setUser({
      ...user,
      price: parseInt(e.target.value)
    });
  }
  const onInputChangeIntQuantity = (e) => {
    setUser({
      ...user,
      quantity: parseInt(e.target.value)
    });
  }
  return (
    <div>
    Add product
    <form onSubmit={(e)=>onSupmit(e,props.id)}>
    <div className='mb-3'>
    <label>Name</label>
    <input name='name' placeholder='Enter your name' className='form-control'value={name} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Price</label>
    <input name='price' type='number' placeholder='Enter your price' className='form-control'value={price} onChange={(e)=>onInputChangeIntPrice(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Derection</label>
    <input name='derectory'  placeholder='Enter your price' className='form-control'value={derectory} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Quantity</label>
    <input name='quantity' type='number' placeholder='Enter your price' className='form-control'value={quantity} onChange={(e)=>onInputChangeIntQuantity(e)}></input>
    </div>
    <div className='mb-3'>
    <label>Category</label>
    <input name='category' placeholder='Enter your price' className='form-control'value={category} onChange={(e)=>onInputChange(e)}></input>
    </div>
    <div className='mb-3'>
    <label htmlFor="img">Image</label><br></br>
          <input type="file" id="img" name="img" onChange={handleFileUpload} />
          {imageSrc && <img src={imageSrc} alt="Image Preview" />}
    </div>
    <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
    </div>
  )
}


