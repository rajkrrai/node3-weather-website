const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { query } = require("express");
const geocode = require("./utils/utils");
const forecast = require("./utils/forecast");

const app = express();
const port=process.env.PORT || 3000


//Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath)); //if index.html file is found then it will show that otherwise render index.hbs file

app.get("", (req, res) => {
  res.render("index", {
    name: "Rajesh",
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Rajesh Kr",
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Rajesh Kr",
    title: "Help",
    helptext: "this is some helpful text",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address must be provided",
    });
  }
  const place = req.query.address;
  geocode(place, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error + " from place",
      });
    } else {
      forecast(longitude, latitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error: error + " from forecast",
          });
        } else {
          res.send({
            location,
            forecastdata,
            address: place,
          });
          console.log(location);
          console.log(forecastdata);
        }
      });
    }
  });

  console.log(req.query.address);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rajesh Kr",
    errorMessage: "help article not founds",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rajesh Kr",
    errorMessage: "Page not found",
  });
});

//below code to start the server
app.listen(port, () => {
  console.log("server is running on port 3000. visit localhost: "+ port);
});
