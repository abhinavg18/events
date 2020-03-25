const express = require('express');
var bodyParser= require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
const router = express.Router();

router.get('/', function(req,res){

    if (req.session && req.session.loggedIn && req.session.loggedIn==true){
        res.redirect('/savedConnections');
    } else{
        //res.render('login',{loggedIn:false});
        res.render('login',{title:"Login",loggedIn:false,name:""});
    }
    
});

router.post('/',urlencodedParser, function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    console.log(username , password);
    if (username && password){
        req.session.username = username;
	
    req.session.loggedIn=true;
    
    }
	
     res.redirect('/savedConnections');
    
});

module.exports = router;