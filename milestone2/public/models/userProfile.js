
//************************** */

var mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
var userProfileSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.Mixed,
    ref:'User',
    required: true
  },
  userConnections: {
    type: Array,
    required: true
  }
}, { collection: "UserProfileDB" });

module.exports = mongoose.model("UserProfile", userProfileSchema);
UserProfile=mongoose.model("UserProfile", userProfileSchema);
module.exports.createUser=async function(u,cb){
  var newProfilemodel= new UserProfile ({"user":u,"userConnections":[]});
    await newProfilemodel.save(function (err, nprofile) {
        if (err) console.log(err);
        console.log(nprofile + " saved to profile collection.");
        cb([nprofile]);
        //cb(newProfilemodel)
      });
}
