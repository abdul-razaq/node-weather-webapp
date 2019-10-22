const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const url = `https://api.darksky.net/forecast//${latitude},${longitude}?units=si`;

  // make the http request
  request({ url, json: true }, (error, response) => {

    if (!error && response) {

      callback(undefined, {
        summary: response.body.currently.summary,
        temperature: response.body.currently.temperature,
        rain: response.body.currently.precipProbability
      });
      
    } else if (!error && (response.body.code === 400 || response.body.error)) {

      callback('Bad input received, check your input!', undefined);

    } else {

      callback('Unable to locate weather information, are you connected to the internet?', undefined);

    }

  });
}

module.exports = forecast;
