var userModel= require('./../models/user');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events",{useNewUrlParser: true, useUnifiedTopology: true});

//To get all the connections
module.exports.getUser = async function() {
   var u=await userModel.find({},function(err, user){
      console.log('inside get user ', user);
      if (err) throw err;
      if (user){
        console.log('inside if get user ', user);
        return(user);
      }else{
        return(null);
      }
    })
    return u;
      
};
  