'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const getJSON = require('get-json');
const weatherURL = 'https://api.forecast.io/forecast/' + process.env.WEATHER_KEY + '/40.6974881,-73.979681?exclude=[minutely,alerts,flags,daily]';

app.get('/weather', (req, res) => {
  getJSON(weatherURL, (err, response) => {
    let hourlyWeather = [];
    const weatherData = response.hourly.data;
    for(var i = 0; i < 12; i++) {
      let obj = {};
      obj.time = weatherData[i].time;
      obj.temp = weatherData[i].apparentTemperature;
      obj.precip = weatherData[i].precipProbability;
      hourlyWeather.push(obj);
    }
    res.send(hourlyWeather)
  })
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
