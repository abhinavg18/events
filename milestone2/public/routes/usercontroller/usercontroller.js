const userProfile = require('../../util/userProfile');
const express = require('express');

const router = express.Router();



router.get('/', function(req,res,next){
    console.log("saved connection");
    var tag=false;
    
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
    }
    if (tag){
        var queryVal=req.query;
        var uProfileArray=[{
            userId:1,
            connections:
            []}];
        if (req.session && req.session.profileArray){
             uProfileArray=req.session.profileArray;
        }    
            console.log(uProfileArray);
            console.log(queryVal);
            if (queryVal.action=="add" ){
                    console.log("inside add");
                     if (queryVal.rsvp=="Yes" || queryVal.rsvp=="No" || queryVal.rsvp=="Maybe"){
                        console.log("inside Yes");
                        console.log(queryVal.connectionId);
                        //once the user part is done add the logic for userId here
                        var obj= {userId:1,connId: queryVal.connectionId, rsvp:queryVal.rsvp};
                        userProfile.addConnection(uProfileArray,obj, function(cb){
                            req.session.profileArray=cb;
                        next();
                     })
        
                    }
            }else if(queryVal.action=="update"){
                console.log("inside update");
                
                if (queryVal.rsvp=="Yes" || queryVal.rsvp=="No" || queryVal.rsvp=="Maybe"){
                    console.log("inside Yes");
                    console.log(queryVal.connectionId);
                    //once the user part is done add the logic for userId here
                    var obj= {userId:1,connId: queryVal.connectionId, rsvp:queryVal.rsvp};
                    userProfile.updateRSVP(uProfileArray,obj, function(cb){
                        if (cb)
                        req.session.profileArray=cb;
                        else
                        res.redirect('/connections');
                    next();
                })
            }
            }
            else if(queryVal.action=="delete"){
                console.log("inside delete");
                console.log(queryVal.connectionId)
                var obj= {userId:1,connId: queryVal.connectionId};
                userProfile.deleteConnection(uProfileArray,obj, function(cb){
                    req.session.profileArray=cb;
                    next();
                })
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
            var uProfileArray=req.session.profileArray;
            console.log("array inside the saved conn"+ uProfileArray);
            userProfile.getUserConnections(uProfileArray,1,function (data){
            
                
                    console.log(data.connections);
                     res.render('savedConnections',{connection:data,title:"Saved Connection",loggedIn:tag, name:name});
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


module.exports = router;