const request = require("request");

let options = {
  uri:
    "http://demucvtr13.de.pri.o2.com/svn/is_docs/trunk/SRs/Release/2020/R20.3/",
  method: "GET",
  proxy: "http://bc-proxy-vip.de.pri.o2.com:8080/",
  //   headers: {
  //     Authorization: HTTPBasicAuth("o2", "cando"),
  //     //   "Basic " +
  //     //   new Buffer.allocUnsafe("o2" + ":" + "cando").toString("base64"),
  //   },
  auth: {
    user: "o2",
    pass: "cando",
    sendImmediately: false,
  },
};
request(options, (error, response) => {
  console.error(error);
  console.log(response.body);
});
