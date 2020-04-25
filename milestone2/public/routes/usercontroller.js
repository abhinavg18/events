
const UserProfile = require('../util/userProfile');
const express = require('express');
var bodyParser= require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
const router = express.Router();
const userDB= require('../util/user');
const ConnectionModel=require('../models/connection');

const User= require('../models/user');
const connectionDb= require('../util/connectionDB');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events",{useNewUrlParser: true, useUnifiedTopology: true});


// actions signify what the user wants to do whether its add/update/delete
//rsvp stores the value in query parameter for Yes/No/Maybe
// if the object doesn't exist in session for the user it redirects to the login page

router.get('/savedConnections', async function(req,res,next){
    console.log("saved connection");
    var tag=false;
    console.log( req.session);
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
    }
    if (tag){
        var queryVal=req.query;
     
        if (req.session && req.session.profileArray){

            var uProfileArray= req.session.profileArray;
            
          
        }    
            console.log("profilearray",uProfileArray);
            console.log("queryval ",queryVal);
            if (queryVal.action=="add" ){
                    console.log("inside add");
                     if (queryVal.rsvp=="Yes" || queryVal.rsvp=="No" || queryVal.rsvp=="Maybe"){
                        
                        console.log(queryVal.connectionId);
                    
                        console.log("userprofilearray ",uProfileArray[0].user,"query values: ",queryVal.rsvp);
                       connectionDb.getConnection(queryVal.connectionId,  await function (data){
                        UserProfile.addConnection(uProfileArray[0].user,data,queryVal.rsvp, async function(cb){
                            console.log("here",cb);
                            req.session.profileArray=uProfileArray;
                        next();
                        })
                            
                    });
                    }
            }  else if(queryVal.action=="update"){
                console.log("inside update");
                
                if (queryVal.rsvp=="Yes" || queryVal.rsvp=="No" || queryVal.rsvp=="Maybe"){
                    console.log("inside Yes");
                    console.log(queryVal.connectionId);
                    //once the user part is done add the logic for userId here
                    
                    connectionDb.getConnection(queryVal.connectionId,  await function (data){
                        UserProfile.updateRSVP(uProfileArray[0].user,data,queryVal.rsvp, async function(cb){
                            console.log("here",cb);
                            req.session.profileArray=uProfileArray;
                        next();
                        })
                            
                    });
                  
              
            }
            }else if(queryVal.action=="delete"){
                console.log("inside delete");
                console.log(queryVal.connectionId)

                connectionDb.getConnection(queryVal.connectionId,  await function (data){
                    UserProfile.deleteConnection(uProfileArray[0].user,queryVal.connectionId, async function(cb){
                        console.log("here",cb);
                        req.session.profileArray=uProfileArray;
                    next();
                    })
                        
                });
                
             }
            else{
                next();
            }
    }else{
        next();
    }
},(function(req,res){

    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    if (tag){
        if (req.session && req.session.profileArray){
            console.log("inside the second conti", req.session.profileArray);
            var uProfileArray= req.session.profileArray;
            
        
            UserProfile.getUserConnections(uProfileArray[0].user,function (data){
                     res.render('savedConnections',{connection:data[0].userConnections,title:"Saved Connection",loggedIn:tag, name:name});
                    return;
                
                
            });
        }else{
            res.render('savedConnections',{connection:null,title:"Saved Connection",loggedIn:tag,name:name});
        }
       
    }
    else{
        res.redirect('/login');
        }
    })
);

router.get('/login', function(req,res){

    if (req.session && req.session.loggedIn && req.session.loggedIn==true){
        res.redirect('/savedConnections');
    } else{
        //res.render('login',{loggedIn:false});
        res.render('login',{title:"Login",loggedIn:false,name:""});
    }
    
});
// login page
// redirects to saved connection once done
router.post('/login',urlencodedParser, async function(req,res){

    console.log("login");
    var username = req.body.username;
    var password = req.body.password;
    

    
    console.log(username , password);
    if (username && password){
        let user= await userDB.getUser();
            console.log("we got user", user);
            req.session.username = user[0].fname;
        UserProfile.getUserConnections(user[0], function(uProfile){
            console.log(uProfile)
            
            //console.log(uProfile[0].userConnections)
            if (uProfile){
                req.session.profileArray=uProfile;
                console.log('inside first if');
            }else{
                req.session.profileArray=uProfile
                
            }
            req.session.loggedIn=true;
    console.log('login session', req.session);
    res.redirect('/savedConnections');
        });
       
    }
	
     
    
});

router.get('/logout',urlencodedParser, function(req,res){

    if(req.session && req.session.loggedIn){
        req.session.destroy();
        
    }
     res.redirect('/');
    
})
// creates a new event , gets the value from the body passes it as an object to the model where the event is created and returned
// subsequently another request is sent to add the connection(event) to the user
router.post('/newuserconn',urlencodedParser, async function(req,res){

    console.log("newuserconn ", req.body);
    var tag=false;
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        uname=req.session.username;
    }
    if (tag){
    var topic = req.body.topic;
    var name = req.body.name;
    var details = req.body.details;
    var where = req.body.where;
    var datetime = req.body.datetime;
    var uProfileArray= req.session.profileArray;
    var ob={"name":name, "topic": topic, "details":details, "where":where, "date":datetime.slice(0,10), "time": datetime.slice(11,16),"host":uname};
    
    await ConnectionModel.insertNewConn(uProfileArray[0].user,ob,async function(addedConn){
        console.log("addedConn", addedConn);
         await UserProfile.addConnection(uProfileArray[0].user,[addedConn],"Yes", async function(cb){
             console.log("here",cb);
         req.session.profileArray=uProfileArray;
         res.redirect('/savedConnections')
         })
    });
  
    
    
}else{
    res.redirect('/login');
}
    
});
module.exports = router;