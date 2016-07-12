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
    for(let i = 0; i < 12; i++) {
      const timestamp = convertTimestamp(weatherData[i].time);
      const temp = parseInt(weatherData[i].apparentTemperature).toFixed();
      const precip = parseInt(weatherData[i].precipProbability) * 100;
      hourlyWeather += pad(timestamp, 2) + ',';
      hourlyWeather += pad(temp, 3) + ',';
      hourlyWeather += pad(precip, 3) + ';';
    }
    res.send(hourlyWeather);
  })
});

function pad(num, size) {
  const str = "0000" + num;
  const padStr = str.substring(str.length - size);
  return padStr
}

function convertTimestamp(stamp) {
  const hour = moment.tz(new Date(stamp * 1000), 'America/New_York').format("HH");
  if(hour > 12) {
    return hour - 12
  } else {
    return hour
  }
}

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!');
});
