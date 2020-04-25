var connectionModel= require('./../models/connection');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events",{useNewUrlParser: true, useUnifiedTopology: true});





//To get all the connections
module.exports.getConnections = function(cb) {
  connectionModel.find({},function(err, connArrayList){
    if (err) throw err;
    if (connArrayList){
      cb(connArrayList);
    }else{
      cb(null);
    }
  })
   

  };

  
  
  // to get the connection with ID
  module.exports.getConnection = function(id, cb) {
    console.log('getConnection')
    const conn = connectionModel.find({connectionId: id},function(err,conn){
      if (err) throw err;
      
      if (conn) {
        console.log(conn);
        cb(conn) ;
      } else {
        cb(null);
      }
    });
        
   

  };
  
 



