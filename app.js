var express = require("express");
var bodyParser = require("body-parser");

var db = require('./db/db')

var app = express();

var router = require('./routes/index.routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to ilaaj backend!",
  });
});

app.use("/api/v1", router)

db.connectDb();

module.exports = app
