var connectionModel= require('./../models/connection');
var connArrayList=[
  new connectionModel("1",
  "Featuring Biswa-Mast Aadmi",
  "Comedy Shows", "Biswa is from India and has been a known person in the comedy circle",
  "Febraury 23rd 2020","6pm")
  ,
    new connectionModel("2","Featuring Angad Singh Ranyal","Comedy Shows", "Angad pajji is from India and has been a known person in the comedy circle",
    "Febraury 23rd 2020","6pm"),
    new connectionModel("3", "Featuring Jerry Seinfield", "Comedy Shows", "Jerry is an American and has been a known person in the comedy circle",
    "Febraury 23rd 2020",
    "6pm") ,
    new connectionModel("4",
    "Smokey Mountains",
    "Trekking", 
    "A location which will give you the thrills of a life time experience",
    "Febraury 23rd 2020",
    "6pm"),
    new connectionModel(
      "5",
     "Pisgah National Forest",
     "Trekking", 
    "Threough the green cover, surrounded by wild life. It is one of the most sought after trails",
    "Febraury 23rd 2020",
    "6pm"),
    new connectionModel("6",
     "Chimney Rock",
     "Trekking", 
    "Rocks and more Rocks... You got to visit to know",
    "Febraury 23rd 2020",
    "6pm")

];


//To get all the connections
module.exports.getConnections = function(cb) {
    console.log("db getconnections");
      if (connArrayList) {
        
        cb( connArrayList);
      } else {
        cb(null);
      }

  };
  
  // to get the connection with ID
  module.exports.getConnection = function(id, cb) {
    const conn = connArrayList.find(c => c.connectionId === id);
    if (!conn) {
      cb(null);
    return;
    }
    cb(conn);

    console.log("here");
 
  };