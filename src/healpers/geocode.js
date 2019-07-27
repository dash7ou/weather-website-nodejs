const request = require("request");
module.exports = function geocode(address) {
  return new Promise((resolve, reject) => {
    const encodeAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeAddress}.json?access_token=pk.eyJ1IjoiZGFzaDdvdSIsImEiOiJjanlrZXM4Z2kwOHY1M250NWp5M2pxd2hvIn0.rXOchl0lGgzU0B9QLZr8Cg`;

    request({ url: url, json: true }, (err, res) => {
      if (err) return reject("Unable to connect to location server");
      if (res.body.features == 0)
        return reject("Unable to find location try another search");

      const dataReturn = {
        latitude: res.body.features[0].center[0],
        longitude: res.body.features[0].center[1],
        placeName: res.body.features[0].place_name
      };
      resolve(dataReturn);
    });
  });
};
