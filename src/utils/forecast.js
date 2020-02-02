const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/54ec5d5a02fc39cccf4d656345304869/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service", null);
    } else if (body.error, null) {
      callback("Place not found", null);
    } else {
      const { temperature, precipProbability, summary } = body.currently;
      callback(null, `there is currently ${temperature} degrees, and a ${precipProbability}% chance of rain. It is looking ${summary}.`)
    }
  });
};

module.exports = forecast;
