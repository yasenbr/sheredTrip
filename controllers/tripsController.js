const router = require("express").Router();
const tripServices = require("../services/tripServices.js");
const userServices = require("../services/userServices");
router.get("/displayTrip", (req, res, next) => {
  if (req.user) {
    tripServices
      .getAll(req.user._id)
      .then((trips) => {
        res.render("sharedTrip", { trips });
      })
      .catch(next);
  } else {
    res.render("sharedTrip");
  }
});

router.get("/displayTrip/create", (req, res) => {
  res.render("offerTrip");
});

router.post("/displayTrip/create", (req, res, next) => {
  let tripData = extractTripData(req);
  tripServices
    .create(tripData, req.user.username)
    .then((createdTrip) => {
      res.redirect("/");
    })
    .catch(next);
});
router.get("/displayTrip/detail/:_id", (req, res) => {
  let tripsBuddiesList =[];
  tripServices
    .getOne(req.params._id, req.user._id)
    .then((trip) => {
      if (trip.buddies.includes(req.user._id)) {
        trip.buddies.forEach(id => {
          userServices.getOne(id).then((user)=>{
            tripsBuddiesList.push(user.username);
          })
          
        });
        trip.passenger = tripsBuddiesList;
        trip.joined = true;
        trip.seat = 0;
        res.render("driverTripDetails", trip);
      } else if(trip.creator === req.user.username){
        trip.buddies.forEach(id => {
          userServices.getOne(id).then((user)=>{
            tripsBuddiesList.push(user.username);
          })
          
        });
        trip.passenger = tripsBuddiesList;
        trip.isCreator = true;
        // trip.noSeat = false;
        trip.seat = false;
        console.log(trip);
        res.render("driverTripDetails", trip);
      }else{
        trip.buddies.forEach(id => {
          userServices.getOne(id).then((user)=>{
            tripsBuddiesList.push(user.username);
          })
          
        });
        trip.passenger = tripsBuddiesList;
        res.render("driverTripDetails", trip);
      }
    })
    .catch((err) => {
      let error = Object.keys(err?.errors).map((x) => ({
        message: err.errors[x].properties.message,
      }))[0];
      res.render("/displayTrip/detail/:_id", { error });
    });
});

router.post("/displayTrip/detail/:_id/", (req, res) => {
  tripServices
    .getOne(req.params._id, req.user.username)
    .then((trip) => {
      let id = req.params._id;
      if (trip.creator === req.user.username) {
        //delete
        tripServices.deleteOne(id).then(()=>{
          res.redirect("/trips/displayTrip");
        })
      } else if (trip.creator !== req.user.username && trip.seat > 0) {
        let seat = Number(trip.seat) - 1;
        let buddies = req.user._id;
        let tripData = {
          seat,
        };

        tripServices.updateTrip(id, tripData).then(() => {
          tripServices
            .updateBuddiesList(id, buddies)
            .then((trip) => {
              res.redirect("/trips/displayTrip");
            })
            .catch((err) => {
              let error = Object.keys(err?.errors).map((x) => ({
                message: err.errors[x].properties.message,
              }))[0];
              // console.log(errors);
              res.render("/displayTrip/detail/:_id", { error });
            });
        });
      }
    })
    .catch((err) => {
      let error = Object.keys(err?.errors).map((x) => ({
        message: err.errors[x].properties.message,
      }))[0];
      // console.log(errors);
      res.render("/displayTrip/detail/:_id", { error });
    });
});

function extractTripData(req) {
  let startPoint = "";
  let endPoint = "";
  let date = "";
  let time = "";
  let { trip, dateTime, seat, description, carImg } = req.body;
  const regex = /([A-za-z ]+)/g;
  const regexDate = /\d\d([ A-Za-z]+)\d\d\d\d/;
  const regexTime = /\d\d:\d\d/gm;
  const found = trip.match(regex);
  const foundDate = dateTime.match(regexDate);
  const foundTime = dateTime.match(regexTime);
  startPoint = found[0].trim();
  endPoint = found[1].trim();
  date = foundDate[0];
  time = foundTime[0];

  // console.log(startPoint);
  // console.log(endPoint);
  // console.log(date);
  // console.log(time);

  let tripData = {
    startPoint,
    endPoint,
    time,
    date,
    seat,
    description,
    carImg,
  };

  return tripData;
}

module.exports = router;
