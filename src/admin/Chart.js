import React from 'react';
import OrderChart from './OrderChart';

const orders = [
    {
        "id": 1,
        "userID": "123",
        "address": "1234 Main St",
        "status": "2",
        "price": "100",
        "phone": null,
        "listProduct": [
            {
                "name": "Product 1",
                "price": 10.99,
                "quantity": 2,
                "img": "https://example.com/product1.jpg"
            },
            {
                "name": "Product 2",
                "price": 24.99,
                "quantity": 1,
                "img": "https://example.com/product2.jpg"
            }
        ]
    },
    {
        "id": 2,
        "userID": "",
        "address": "",
        "status": "1",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 3,
        "userID": "",
        "address": "",
        "status": "2",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 4,
        "userID": "",
        "address": "",
        "status": "1",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 5,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 6,
        "userID": "123",
        "address": "132",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 7,
        "userID": "input",
        "address": "sffd",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 11,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 12,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 13,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 14,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 15,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 16,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 17,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 18,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 19,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 20,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 21,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 22,
        "userID": "Ancol",
        "address": "long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 23,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 24,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 25,
        "userID": "",
        "address": "",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 26,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 27,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an 123",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 28,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 32,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 35,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 36,
        "userID": "Nguyễn Văn Duy",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 37,
        "userID": "1",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 38,
        "userID": "1",
        "address": "Long an",
        "status": "0",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    },
    {
        "id": 39,
        "userID": "2",
        "address": "Ap 3 Long An",
        "status": "1",
        "price": "10",
        "phone": null,
        "listProduct": [
            {
                "name": "Giay NIKE",
                "price": 10.0,
                "quantity": 1,
                "img": "images/img-Nike1.jpg"
            }
        ]
    }
]

const Chart = () => {
  return (
    <div className="App">
      <OrderChart orders={orders} />
    </div>
  );
};

export default Chart;
