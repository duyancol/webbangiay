import React, { useEffect, useState } from 'react'; 
import Chart from 'chart.js/auto'; 
import axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const SalesChart = () => { 
  const [chartData, setChartData] = useState({}); 
  const[orders,setOrder]=useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = async (date) => {
    const formattedDate = date.toISOString().substring(0, 10); // 'YYYY-MM-DD'
    setSelectedDate(formattedDate);

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/auth/viewChart?date=${formattedDate}`);
     
      const data = response.data;
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => { 
    const data = orders.reduce((acc, order) => { 
      const date = new Date(order.createdAt).toLocaleDateString(); 
      order.listProduct.forEach((product) => { 
        if (acc[product.name]) { 
          acc[product.name].value += product.price * product.quantity; 
        } else { 
          acc[product.name] = { label: product.name, value: product.price * product.quantity }; 
        } 
      }); 

      if (acc.total) { 
        acc.total.value += order.total; 
      } else { 
        acc.total = { label: 'Total sales', value: order.total }; 
      } 

      return acc; 
    }, {}); 

    const labels = Object.keys(data); 
    const values = Object.values(data).map((item) => item.value); 
    const colors = getColors(values.length); 

    setChartData({ 
      labels, 
      datasets: [{ 
        data: values, 
        backgroundColor: colors, 
        hoverBackgroundColor: colors.map((color) => `${color}80`), 
      }], 
    }); 
  }, [orders]); 

  useEffect(() => { 
    const chartConfig = { 
      type: 'pie', 
      data: chartData, 
      options: { 
        responsive: true, 
        plugins: { 
          legend: { 
            position: 'bottom', 
          }, 
        }, 
        tooltips: { 
          callbacks: { 
            label: (context) => { 
              const item = context.dataset.data[context.dataIndex]; 
              const label = context.dataset.label[context.dataIndex]; 
              return `${label}: ${'$' + item.toLocaleString()}`; 
            }, 
          }, 
        }, 
      }, 
    }; 

    const chartCanvas = document.querySelector('#sales-chart'); 
    const chart = new Chart(chartCanvas, chartConfig); 
    return () => chart.destroy(); 
  }, [chartData]); 
  const getColors = (length) => { 
    const palette = ['#FF6383', '#36A2EB', '#FFCE56', '#6857E6', '#FF5733', '#4CAF50', '#F44336', '#9C27B0', '#3F51B5', '#03A9F4', '#009688']; 
    const colors = []; 
    for (let i = 0; i < length; i++) { 
      colors.push(palette[i % palette.length]); 
    } 
    return colors.slice(0, length); 
  }; 
  
  const renderOrderList = () => {
    return (
      <div>
        
      </div>
    );
  };
  return ( 
    <div> 
    <main>
    
   
    <div class="head-title">
        <div class="left">
            <h1>Chart </h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <li>
                    <a class="active" href="#">Chart</a>
                </li>
            </ul>
        </div>
        <a href="#" class="btn-download">
            <i class='bx bxs-cloud-download' ></i>
            <span class="text">Download PDF</span>
        </a>
    </div>
     
       
    
      <section>
      <div className='bentrai'>
      <form>
      <label htmlFor="date-selector">Select date : </label>
      <input
        type="date"
        id="date-selector"
        value={selectedDate}
        onChange={(event) => handleDateChange(new Date(event.target.value))}
      />
    </form>
    <h2>Order List One Day:</h2>
    {renderOrderList()}
      <canvas id="sales-chart" style={{ height: '500px' }} /> 
      <div style={{ marginTop: '20px' }}> 
        <h2>Daily Total Sales</h2> 
        <p>{'$' +(chartData.datasets ? chartData.datasets[0].data.reduce((sum, value) => {
            if (isNaN(value)) {
              // giá trị không phải là số, bỏ qua
              return sum;
            }
            else {
              // giá trị là số, tính vào tổng
              return sum + value;
            }
          }, 0).toLocaleString() : 0)}</p> 
  </div> 
      </div>
      
      <div className='benphai'>
        <h1>London</h1>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Total Order" secondary="Jan 9, 2023" />
        <span>{orders.length}</span>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Daily Total Sales" secondary="Jan 9, 2023" />
        <span>{'$' +(chartData.datasets ? chartData.datasets[0].data.reduce((sum, value) => {
          if (isNaN(value)) {
            // giá trị không phải là số, bỏ qua
            return sum;
          }
          else {
            // giá trị là số, tính vào tổng
            return sum + value;
          }
        }, 0).toLocaleString() : 0)}</span> 
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Sale" secondary="July 20, 2014" />
        <span>10%</span>
      </ListItem>
    </List>
      </div>
    </section>
    
      </main>
    </div> 
  ); 
}; 

export default SalesChart;
