const express = require("express");
const router = express.Router();
const db = require("../model/config");
const events = require("events");
const mailer = require("nodemailer");
const myEmitter = new events.EventEmitter();

router.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, rows, fields) => {
    console.log("err", err, "rows", rows, "fileds", fields);
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

router.post("/add", (req, res, callback) => {
  try {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let query = "INSERT INTO user (firstname, lastname) VALUES (?,?)";
    db.query(query, [firstname, lastname], (err, rows, fields) => {
      console.log("err", err, "rows", rows, "fileds", fields);
      if (!err) {
        let query = "SELECT * FROM user";
        db.query(query, (err, rows, fields) => {
          res.status(200);
          res.send(rows);
          myEmitter.emit("sendMail", res);
        });
      } else {
        console.log(err);
      }
    });

    myEmitter.on("sendMail", data => {
      console.log("myEmitter.data", data.statusCode);
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", (req, res) => {
  try {
    let peopleId = req.body.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    console.log(peopleId, firstname, lastname);
    let query =
      "UPDATE user SET firstname='" +
      firstname +
      "', lastname = '" +
      lastname +
      "' WHERE id = " +
      peopleId;
    console.log(query);
    db.query(query, (err, rows, fields) => {
      console.log("err", err, "rows", rows, "fileds", fields);
      if (!err) {
        let query = "SELECT * FROM user";
        db.query(query, (err, rows, fields) => {
          res.send(rows);
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", (req, res) => {
  try {
    let peopleId = req.body.id;
    let query = "DELETE FROM user WHERE id =" + req.body.id;
    db.query(query, (err, rows, fields) => {
      console.log("err", err, "rows", rows, "fileds", fields);
      if (!err) {
        let query = "SELECT * FROM user";
        db.query(query, (err, rows, fields) => {
          res.send(rows);
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
