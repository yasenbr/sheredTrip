const Trips = require("../models/Trip");
const User = require("../models/User");

const create = (tripData, userId) => {
  let trips = new Trips({
    ...tripData,
    creator: userId,
  });
  return trips.save();
};
const getAll = () =>
  Trips.find({})
    .lean()
    .then((trips) => {
      return trips;
    });

const getOne = (id, userName) =>
  Trips.findById(id).then((trip) => {
    trip.isCreator = trip.creator === userName;
    return trip;
  });

const updateTrip = (id, data) => {
  console.log(data);
  return Trips.updateOne({ _id: id }, data);
};
const updateBuddiesList = (id, data) => {
  return Trips.findById(id).then((trip) => {
    console.log(data);
    console.log(trip);
    trip.buddies.push(data);

    return trip.save();
  });
};

module.exports = {
  create,
  getAll,
  getOne,
  updateTrip,
  updateBuddiesList,
};
