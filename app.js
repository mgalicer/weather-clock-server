var express = require('express');
var app = express();
var request = require("request");

var options = { method: 'GET',
  url: 'https://api.forecast.io/forecast/' + process.env.WEATHER_KEY + '/40.6974881,-73.979681',
  qs: { exclude: '[minutely,alerts,flags,daily]' },
};

app.get('/weather', function (req, res) {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


