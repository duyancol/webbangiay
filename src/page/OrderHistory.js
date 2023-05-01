
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function OrderHistory() {
    const [order, setOrder] = useState([]);
    const {iduser}=useParams();
    useEffect(() => {
      fetch(`http://localhost:8080/api/v1/auth/order/${iduser}`)
        .then(res => res.json())
        .then(data => setOrder(data))
        .catch(err => console.error(err));
    }, []);
  
    if (!Array.isArray(order) || order.length === 0) {
      return <div>Không có đơn hàng</div>;
    }
  
    return (
      <div>
        {order.map(items => (
          <div key={items.id}>{items.address}</div>
        ))}
      </div>
    );
  }