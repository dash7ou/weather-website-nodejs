const request = require("request");

module.exports = function getWeather(data) {
  return new Promise((resolve, reject) => {
    const latitude = data.latitude;
    const longitude = data.longitude;
    const url = `https://api.darksky.net/forecast/f564e9e504a118597f75ab17df0324cd/${longitude},${latitude}`;

    request({ url: url, json: true }, (err, res) => {
      if (err) return reject("Unable to connect to weather server");
      if (res.body.error) return reject(res.body.error);

      let currently = res.body.currently;
      let summary = res.body.daily.data[0].summary;

      let printIt = `${data.placeName}\n${summary}\nIt is currently ${
        currently.temperature
      } degrees out. there is a ${
        currently.precipProbability
      }% chance of rain `;
      dataReturn = {
        placeName: data.placeName,
        summary: summary,
        currentlyTemperature: currently.temperature,
        precipProbability: currently.precipProbability,
        currentlyPrecipProbability: currently.precipProbability
      };
      resolve(dataReturn);
    });
  });
};
