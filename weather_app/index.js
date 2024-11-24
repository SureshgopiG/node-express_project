const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());


const API_KEY = 'e754abdbd956545bfceddaeade78fedb';

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;


    res.json({
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
