const express = require('express');

const connectionDb= require('../util/connectionDB');

const router = express.Router();


//for a url with connection and an id in its query paramter this route is called
// if the particular id isn't present it redirects to the connections page
router.get('/connection', function(req,res){
    var tag=false;
    var name="";
    console.log(req.query.action);
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    console.log(req.query);
    connectionDb.getConnection(req.query.connectionID,function (data){
        console.log("inside index after getting connection")
        console.log(data);
        if (data==null){
        res.status(400).redirect('/connections'); 
            return;
    }
        else{
            var act;
            if (req.query.action){
                act=req.query.action;
            }else{
                act="add";
            }
            data.forEach(element => {
                console.log(element.connectionId)
            });
        res.render('connection',{connection:data[0],title:"Event", loggedIn:tag,name:name,action:act});
            return;
    }
        
    });
    
});
//a url with connections will be handled by this route. It connects to the db and fetches the object and renders
//it to the ejs
// i have used a set to get unique topics 
router.get('/connections', function(req,res){
    console.log("getconnections");
    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        console.log(req.session)
        console.log(req.session.username);
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    connectionDb.getConnections(data=>{
        
     var topics = [...new Set(data.map(conn => conn.topic))];
     res.render('connections',{connectionsObj:data, topicsObj:topics, title:"Events",loggedIn:tag,name:name});
    });
    
});



// route to create a new connection
router.get('/newConnection',function(req,res){
    console.log("new connection");
    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    res.render("newConnection",{title:"New Connection",loggedIn:tag,name:name});
});


    
    


// route to about page
router.get('/about', function(req,res){
    console.log("about");
    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    res.render('about',{title:"About",loggedIn:tag,name:name});
});

// route to contact page
router.get('/contact', function(req,res){
    console.log("contact");
    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    res.render('contact', {title:"Contact",loggedIn:tag,name:name});
});



// route to index page
router.get('/', function(req,res){
    var tag=false;
    var name=""
    if (req.session && req.session.loggedIn){
        tag=req.session.loggedIn;
        name=req.session.username;
    }
    res.render('index',{title:"Home Page", loggedIn:tag,name:name});
});

module.exports = router;