const express = require('express');

var bodyParser= require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
const router = express.Router();

router.get('/',urlencodedParser, function(req,res){

    if(req.session && req.session.loggedIn){
        req.session.destroy();
        
    }
     res.redirect('/');
    
})

module.exports = router;