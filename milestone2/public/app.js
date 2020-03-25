var express= require('express');
var session= require('express-session');
var app=express();

var index= require('./routes/index.js');
var usercontroller= require('./routes/usercontroller/usercontroller.js');
var loginController= require('./routes/usercontroller/login.js');
var logoutController= require('./routes/usercontroller/logout.js');
app.set('view engine', 'ejs');
// for images and css we use this
app.use('/assets',express.static('assets'));
app.use(session({
    secret:'nbad',
    resave: true,
    saveUninitialized: true
}));
app.use(function(req,res,next){

    if (req.session && req.session.loggedIn && req.session.loggedIn == true) {
        module.exports.loggedIn = req.session.loggedIn;
      } else {
        req.session.loggedIn = false;
        module.exports.loggedIn = false;
      }
      next();
});

//calling the controller on the / url
app.use('/savedConnections',usercontroller);
app.use('/login',loginController);
app.use('/logout',logoutController);
app.use('/', index);

//runs on port localhost:8084/
app.listen(8084);