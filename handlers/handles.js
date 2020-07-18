const { flights } = require("../test-data/flightSeating");
const { reservations } = require("../test-data/reservations");

function findClient(email) {
  return reservations.find((client) => client.email == email);
}

function findID(id) {
  return reservations.find((client) => client.id === id);
}

function fillFlightArray() {
  let newArray = Object.keys(flights);
  console.log(newArray);
}
function findFlight(flightNumber) {
  return flights[flightNumber];
}
function flightData(req, res) {
  res.status(200).json(Object.keys(flights));
}

function handleSingleFlight(req, res) {
  const flightNo = req.params.flightID;
  const flightlookup = findFlight(flightNo);
  console.log(flightNo);
  if (flightlookup === undefined) {
    res.status(404).send("no such flight exists");
  } else {
    res.status(200).json(flightlookup);
  }
}

function handleGetReserve(req, res) {
  res.status(200).json(reservations);
  console.log(reservations);
}

function handlePostReserve(req, res) {
  const clientEmail = req.body.email;
  const client = findClient(clientEmail);
  const newclient = req.body;
  console.log(newclient);
  if (client) {
    console.log("we have an emaiil");
    res.status(404).send("404");
  } else {
    console.log("200");
    reservations.push(newclient);
    console.log(reservations);
    res.status(200).send("200");
  }
}

function handleConfirmation(req, res) {
  const clientID = req.params.id;
  console.log(clientID);
  const bookedClient = findID(clientID);
  console.log(bookedClient);
  if (bookedClient !== undefined) {
    res.render("./pages/confirm", { client: bookedClient });
  } else {
    res.render("./pages/confirmQuattroZero");
  }
}

function handleInfoPage(req, res) {
  const confirmID = req.params.id;
  console.log(confirmID);
  const bookedClient = findID(confirmID);
  console.log(bookedClient);
  if (bookedClient !== undefined) {
    console.log("all good");
    res.render("./pages/reserveinfo", { client: bookedClient });
  } else {
    console.log("keep working");
    res.render("./pages/reserveQuattroZero");
  }
}
module.exports = {
  flightData,
  handleSingleFlight,
  fillFlightArray,
  handlePostReserve,
  handleGetReserve,
  handleConfirmation,
  handleInfoPage,
};
