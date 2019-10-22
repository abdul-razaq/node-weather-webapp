const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${encodeURIComponent(address)}&key=&limit=1&confidence=10`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, check your input.', undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].geometry.coordinates[0],
        longitude: response.body.features[0].geometry.coordinates[1],
        country: response.body.features[0].properties.components.country,
        state: response.body.features[0].properties.components.state,
        continent: response.body.features[0].properties.components.continent,
      });
    }
  });
}

module.exports = geocode;
