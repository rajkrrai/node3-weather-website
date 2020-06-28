const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFqZXNoa3IyMTciLCJhIjoiY2ticzZ1YmhtMDBvcTJzbzJycXFiNGhxMiJ9.lLZIEjuGy3pguTazisXr2w&limit=1";

  request(
    { uri: url, json: true,}, //proxy: "http://bc-proxy-vip.de.pri.o2.com:8080/" },
    (error, { body }) => {
      if (error) {
        callback(
          "Oops! Unable to connect to location services." + error,
          undefined
        );
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;
