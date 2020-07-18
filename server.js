"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  flightData,
  handleSingleFlight,
  fillFlightArray,
  handlePostReserve,
  handleGetReserve,
  handleConfirmation,
  handleInfoPage,
} = require("./handlers/handles");

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .set("view engine", "ejs")
  // endpoints

  .get("/flights", flightData)
  .get("/flights/:flightID", handleSingleFlight)
  .get("/test", fillFlightArray)
  .post("/users", handlePostReserve)
  .get("/users", handleGetReserve)
  .get("/:id", handleConfirmation)
  .get("/info/:id", handleInfoPage)

  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port 8000`));
