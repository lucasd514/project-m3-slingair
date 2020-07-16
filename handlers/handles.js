const { flights } = require("../test-data/flightSeating");

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
    res.status(200).json({ flightlookup });
  }
}

module.exports = { flightData, handleSingleFlight, fillFlightArray };
