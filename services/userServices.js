const User = require("../models/User");

function getOne(id){
    console.log(id);
    return User.findById(id)
    .lean();
}
 

    module.exports={
        getOne,
    }