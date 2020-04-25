const UserProfileModel= require('../models/userProfile');
var ObjectId = require('mongodb').ObjectID;


    
 // fetches all the user connections by getting the match on user id 
 // if a userid is new then it creates it with the current event    
module.exports.getUserConnections=  async function(u, cb){
    
    console.log("inside getuserconnection",ObjectId(u._id));
   var userProfileModel= await UserProfileModel.find({"user._id":ObjectId(u._id)})
    if (userProfileModel.length==0){
        await UserProfileModel.createUser(u,async function(profilecreated){
            console.log("insider profile created fn");
            userProfileModel=profilecreated;
            cb(userProfileModel);
        });
       
      
    }else{
        cb(userProfileModel);

    }
  

      
    };

    
    // checks if the connection exist or not
    //  updates it accordingly
    
    
    
    module.exports.updateRSVP=async function(u,connection,rsvp,cb){
        var userProfileModel= await UserProfileModel.find({"user._id":ObjectId(u._id)})
        console.log(userProfileModel);
        if( userProfileModel.length>0){
            console.log("inside addconn connid",connection[0].connectionId);
          var ob= await UserProfileModel.update( {"user._id":ObjectId(u._id),"userConnections.connection.connectionId":connection[0].connectionId },
          { $set: { "userConnections.$.rsvp": rsvp  } },
         
              function(err, res) {
                  if (err) {
                      console.log("err",err);
                  } else {
                      console.log("findUpdate", res);
                  }
              }
          );
        }
        cb(true)
    };

    
    // checks if the connection exist or not
    // adds or updates it accordingly
    
    module.exports.addConnection = async function(u,connection,rsvp,cb){
              console.log(connection);
              
              var userProfileModel= await UserProfileModel.find({"user._id":ObjectId(u._id)})
              console.log(userProfileModel);
              if( userProfileModel.length>0){
                  console.log("inside addconn connid",connection[0].connectionId);
                var ob= await UserProfileModel.update( {"user._id":ObjectId(u._id),"userConnections.connection.connectionId":connection[0].connectionId },
                { $set: { "userConnections.$.rsvp": rsvp  } },
               
                    function(err, res) {
                        if (err) {
                            console.log("err",err);
                        } else {
                            console.log("findUpdate", res);
                        }
                    }
                ).then(async function(res){
                    if (res.n==0){
                        await UserProfileModel.update( {"user._id":ObjectId(u._id)},
                { $push: { "userConnections":{"rsvp": rsvp, "connection":connection[0] } }}      ); 
                    }
                });  
                
                                 
            }else{
                console.log("inside else of add connection in userprofile");
                var connectiondetails=[];   
                var conn_rsvp={"connection":connection[0], "rsvp":rsvp}
                connectiondetails.push(conn_rsvp);
                
                var obj= new userProfileModel(u,connectiondetails);
                await obj.save();

            }
            cb(true);

    };

    // checks for the id
    // checks if the particular connection is part of the object for that id
    //deletes it accordingly from the object
    module.exports.deleteConnection = async function(u,connection,cb){

        var userProfileModel= await UserProfileModel.find({"user._id":ObjectId(u._id)})
        console.log(userProfileModel);
        if( userProfileModel.length>0){
            console.log("inside addconn connid",connection);
            console.log("inside addconn connid",connection.connectionId);
          var ob= await UserProfileModel.update( {"user._id":ObjectId(u._id), "userConnections.connection.connectionId":connection },
          { $pull: { "userConnections":{"connection.connectionId":connection}}},
          
              function(err, res) {
                  if (err) {
                      console.log("err",err);
                  } else {
                      console.log("findUpdate", res);
                  }
              }
          );
        }
        cb(true);
           
    }

