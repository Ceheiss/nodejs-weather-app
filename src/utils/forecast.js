const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/54ec5d5a02fc39cccf4d656345304869/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service", null);
    } else if (body.error, null) {
      callback("Place not found", null);
    } else {
      const { temperatureHigh, temperatureLow } = body.daily.data[0];
      const { temperature, precipProbability, summary } = body.currently;
      callback(null, `Currently <strong>${Math.round(temperature)}°C</strong>, and a <strong>${precipProbability}%</strong> chance of rain. It is looking ${summary}.
      <p>Hightest temperature will be <strong>${Math.round(temperatureHigh)}°C</strong> and the lowest <strong>${Math.round(temperatureLow)}°C</strong></p>`)
    }
  });
};

module.exports = forecast;
