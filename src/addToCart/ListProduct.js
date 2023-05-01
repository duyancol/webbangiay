import React, { useState, useEffect } from 'react';


export default function ListProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('http://localhost:8080/api/v1/auth/get3ProductNew')
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      });
  }, []);
  return (
    <div>
    {products.map(product => (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <p>{product.img}</p>
        <p>Giá: {product.price}</p>
        
      </div>
    ))}
  </div>
  )
}
