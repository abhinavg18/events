var mongoose = require("mongoose");
var uuid = require('node-uuid');
var connectionSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  connectionId: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: "Please provide topic."
  },
  name: {
    type: String,
    required: "Please provide Connection Name."
  },
  details: {
    type: String,
    required: "Please provide some details."
  },
  date: {
    type: String,
    required: "Please provide date."
  },
  time: {
    type: String,
    required: "Please provide time."
  },
  host: {
    type: String,
    required: "Please provide host."
  }
}, { collection: "ConnectionDB" });

module.exports = mongoose.model("connection", connectionSchema);

Connection= mongoose.model("connection", connectionSchema);
module.exports.insertNewConn=async function(u,objConnection,cb){
  var newConnection= new Connection ({"uid": u._id,
  "connectionId" : uuid.v1(),
"name" : objConnection.name,
"topic" : objConnection.topic,
"details" : objConnection.details,
"date" : objConnection.date,
"time" : objConnection.time,
"host": objConnection.host
});
    await newConnection.save(function (err, nConnection) {
        if (err) console.log(err);
        console.log(nConnection + " saved to profile collection.");
        cb(nConnection);
        //cb(newProfilemodel)
      });
}