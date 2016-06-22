'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const getJSON = require('get-json');
const weatherURL = 'https://api.forecast.io/forecast/' + process.env.WEATHER_KEY + '/40.6974881,-73.979681?exclude=[minutely,alerts,flags,daily]';


getJSON(weatherURL, function(err, response) {
  console.log(response)
});

// app.get('/weather', (req, res) => {
//   res.render(weatherData)
// });

// app.listen(3000, () => {
//   console.log('Example app listening on port 3000!');
// });


