const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2VoZWlzcyIsImEiOiJjazVxbXo2ODEwM3VmM2lwMmlhZWptNHRlIn0.GnO5g9K8NvB8QCT9orKQkA&limit=1`;

  request({ url, json: true}, (error, { body }) => {
    // If error we pass it back to the callback to handle it.
    // This makes it very reusable
    if (error) {
      callback('Unable to connect to the location server', null);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search',  null);
    } else {
      const  { center, place_name } = body.features[0];
      callback(null, {
        latitude: center[1],
        longitude: center[0],
        location: place_name
      })
    }
  })
}

module.exports = geocode;