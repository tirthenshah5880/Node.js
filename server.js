const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

const db = require("./model/config");
const peopleRoutes = require("./routes/people");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/people", peopleRoutes);
// let data = { people: [{ name: "tirthen", age: 12 }] };

// app.get("/people", (req, res) => {
//   res.json(data);
// });

// app.get("/people/:name", (req, res) => {
//   res.json({ name: req.params.name });
// });

// app.post("/people", (req, res) => {
//   console.log("request", data);
//   if (req.body && req.body.name) {
//     data.people.push({ name: req.body.name, age: req.body.age });
//   }
//   res.json(data);
// });
let url =
  "https://api.darksky.net/forecast/46b8025af7cb3771ac082d5b21549e39/37.8267,-122.4233";
request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log("Unable to find location");
  } else {
    console.log(
      response.body.daily.data[0].summary +
        " It is currently " +
        response.body.currently.temperature +
        " degress out. There is a " +
        response.body.currently.precipProbability +
        "% chance of rain."
    );
  }
});

//geocode
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGlydGhlbiIsImEiOiJjazNqemNnc2Uwb296M29xbzgwZjN1N3d3In0.Ik2Heto5NV5XGT_dRJrL-Q&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location services!");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search.");
  } else {
    const latitude = response.body.features[0].center[0];
    const longitude = response.body.features[0].center[1];
    console.log(latitude, longitude);
  }
});
console.log(process.argv);
app.listen(3000);
