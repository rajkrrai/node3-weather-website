const request = require("request");

const forecast = (lat, long, callback) => {
  const uri = `http://api.weatherstack.com/current?access_key=0941450e8ae4892559d76661f6fc2ebe&query=${lat},${long}&units=m`;
  //   console.log(url);
  request(
    { uri, json: true},// proxy: "http://bc-proxy-vip.de.pri.o2.com:8080/" },
    (error, { body }) => {
      if (error) {
        callback(
          "Oops! Unable to connect to weather services. " + error,
          undefined
        );
      } else if (body.error) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        const curData = body.current;
        // console.log(curData);
        callback(
          undefined,
          curData.weather_descriptions[0] +
            ". It is currently " +
            curData.temperature +
            " degrees out there but it feels like " +
            curData.feelslike
        );
      }
    }
  );
};

module.exports = forecast;
