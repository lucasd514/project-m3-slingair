const { flights } = require("../test-data/flightSeating");
const { reservations } = require("../test-data/reservations");

function findClient(email) {
  return reservations.find((client) => client.email == email);
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
    res.status(404).send("No good");
  } else {
    console.log("can be added");
    reservations.push(newclient);
    console.log(reservations);
    res.status(200).send("Email Good, added to list of reservations");
  }
}

module.exports = {
  flightData,
  handleSingleFlight,
  fillFlightArray,
  handlePostReserve,
  handleGetReserve,
};
