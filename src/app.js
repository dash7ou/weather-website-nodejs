const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./healpers/geocode");
const getWeather = require("./healpers/getWeather");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dash zou"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dash zou"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Dash zou"
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address)
    return res.status(400).send({
      error: "you must Enter address sorry :P"
    });
  try {
    const dataGeocode = await geocode(req.query.address);
    const dataWeather = await getWeather(dataGeocode);
    const forecast = ` ${dataWeather.summary}\nIt is currently ${
      dataWeather.currentlyTemperature
    } degrees out. there is a ${
      dataWeather.precipProbability
    }% chance of rain `;
    res.send({
      forecast: forecast,
      location: dataWeather.placeName,
      address: req.query.address
    });
  } catch (err) {
    res.send({
      address: req.query.address,
      error: err
    });
  }
});

app.get("/weather");

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dash zou",
    errorMessage: "Help article not found."
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dash zou",
    errorMessage: "About article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dash zou",
    errorMessage: "Page not found."
  });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
