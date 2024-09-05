// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = (app) => {
//     app.use(createProxyMiddleware('/api', {
//         target: 'http://localhost:8080/api/v1/auth/get3ProductNew',
//         changeOrigin: true,
       
//     })
//     );
// }
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3003;

app.use(cors());
app.get('/api', async (req, res) => {
    try {
      const response = await axios.get('https://provinces.open-api.vn/api/');
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/open-api', async (req, res) => {
    try {
      const { selectedCity } = req.query;
      const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/open-api-se', async (req, res) => {
    try {
      const { selectedDistrict } = req.query;
      const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
    