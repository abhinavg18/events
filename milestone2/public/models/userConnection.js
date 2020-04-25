
// module.exports=class UserConnection{

//     //this should be a list of connections so
//     //basically have a connectionDB object here
//     constructor(connection,rsvp){
//         this.connection=connection;
//         this.rsvp=rsvp;
       
//     }
//     get getConnection(){
//         return this.connection;
//     }
   

//     set setConnection(value){
//         this.connection=value;
//     }
//     get getRsvp(){
//         return this.rsvp;
//     }
   

//     set setRsvp(value){
//         this.rsvp=value;
//     }
    
// };
//******************* */
var mongoose = require("mongoose");

var userConnectionSchema = new mongoose.Schema({
    connection: {
    type: Object,
    required: true
  },
  rsvp: {
    type: String,
    required: true
  }
}, { collection: "UserConnection" });

module.exports = mongoose.model("UserConnection", userConnectionSchema);

  