// module.exports= class User{
//     constructor(email, fname, lname){
//         this.email=email;
//         this.fname=fname;
//         this.lname=lname;
//     }

//     get getemail(){
//         return this.email;
//     }

//     get getfname(){
//         return this.fname;
//     }
//     get getlname(){
//         return this.lname;
//     }

    
//     set setEmail(value){
//         this.email = value;
//     }

//     set setFname(value){
//         this.fname = value;
//     }
    
//     set setLname(value){
//         this.lname = value;
//     }
// }

//********************************* */
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: "Please provide topic."
  },
  lname: {
    type: String,
    required: "Please provide Connection Name."
  }
}, { collection: "UserDB" });

module.exports = mongoose.model("User", userSchema);

  