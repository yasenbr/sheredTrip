const Trip = require("../models/Trip");
const Trips = require("../models/Trip");

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

const getOne = (id, userName)=>
 Trips.findById(id).then((trip)=>{
   trip.isCreator = trip.creator === userName;
  //  console.log(trip.isCreator);
  //  console.log("this:" ,trip);
   return trip;
 });

 const updateTrip = (id, data) =>{
   console.log(id);
   console.log(data);
   return Trip.updateOne({_id: id}, data);
 };


module.exports = {
  create,
  getAll,
  getOne,
  updateTrip,
  //   deleteTrip,
};
