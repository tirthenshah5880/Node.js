const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
console.log(process.argv);
app.listen(3000);
