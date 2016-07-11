'use strict';

require('dotenv').config();
const moment = require('moment-timezone');
const express = require('express');
const app = express();
const getJSON = require('get-json');
const weatherURL = 'https://api.forecast.io/forecast/' + process.env.WEATHER_KEY + '/40.6974881,-73.979681?exclude=[minutely,alerts,flags,daily]';
const offset = 4;

app.set('port', (process.env.PORT || 5000));

app.get('/weather', (req, res) => {
  getJSON(weatherURL, (err, response) => {
    if(err) {console.log(err)}
    let hourlyWeather = "";
    const weatherData = response.hourly.data;
    for(var i = 0; i < 12; i++) {
      hourlyWeather += convertTimestamp(weatherData[i].time) + ',';
      hourlyWeather += weatherData[i].apparentTemperature + ',';
      hourlyWeather += weatherData[i].precipProbability + ';';
    }
    res.send(hourlyWeather);
  })
});

function convertTimestamp(stamp) {
  const date = moment.tz(new Date(stamp * 1000), 'America/New_York');
  const hour = new Date(date).getHours();
  return hour
}

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!');
});
